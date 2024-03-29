"use strict";

// instanciando los objetos app y BrowserWindow
const { app, BrowserWindow, Tray, globalShortcut, protocol } = require('electron')
const devtools = require ("./devtools");
const setIpcMain = require ("./ipcMainEvents");
const handleErrors = require ("./handle-errors");
const os = require ("os");
const path = require ("path");

global.win; // eslint-disable-line
global.tray; // eslint-disable-line

if (process.env.NODE_ENV === "development") {
  devtools();
}

// imprimiendo un mensaje en la consola antes de salir
app.on("before-quit", () => {
  globalShortcut.unregisterAll();
});

// Ejecutando ordenes cuando la aplicación esta lista
app.on("ready", () => {
  protocol.registerFileProtocol(
    "plp",
    (request, callback) => {
      const url = request.url.substr(6);
      callback({ path: path.normalize(url) }); // eslint-disable-line
    },
    err => {
      if (err) throw err;
    }
  );

  // creando una ventana
  global.win = new BrowserWindow({
    width: 1200,
    height: 768,
    title: "Pics | by: Genarogg",
    center: true,
    maximizable: true,
    show: false,
    icon: path.join(__dirname, "assets", "icons", "main-icon.png")
  });

  /* Elimina la barra de menu */
  win.setMenu(null);

  globalShortcut.register("CommandOrControl+Alt+p", () => {
    global.win.show();
    global.win.focus();
  });

  setIpcMain(global.win);
  handleErrors(global.win);

  // Mostrando la ventana solo cuando el contenido a mostrar sea cargado
  global.win.once("ready-to-show", () => {
    global.win.show();
  });

  // Escuchando el evento cuando la ventana es movida
  global.win.on("move", () => {
    const position = global.win.getPosition();
    console.log(`la posición es ${position}`);
  });

  // detectando el cierre de la ventana para cerrar el aplicativo
  global.win.on("closed", () => {
    global.win = null;
    app.quit();
  });

  let icon;
  if (os.platform() === "win32") {
    icon = path.join(__dirname, "assets", "icons", "tray-icon.ico");
  } else {
    icon = path.join(__dirname, "assets", "icons", "tray-icon.png");
  }

  global.tray = new Tray(icon);
  global.tray.setToolTip("Pics");
  global.tray.on("click", () => {
    global.win.isVisible() ? global.win.hide() : global.win.show();
  });

  // Carga una url desde el folder renderer
  global.win.loadURL(`file://${__dirname}/renderer/index.html`);
});
