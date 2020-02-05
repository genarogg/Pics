"use strict";

/* Instanciado los objetos app y BrowserWindow */
import { app, BrowserWindow } from "electron";
import devTools from "./devTools";
import setIpcMain from "./ipcMainEvents"
import handleErrors from "./handle-errors";


global.global.win;

if (process.env.NODE_ENV === "development") {
  devTools();
}

/* Imprimiendo un mensaje en la consola antes de salir */
app.on("before-quit", () => {
  console.log("Saliendo...");
});

/* Ejecutando ordenes cuando la app esta lista */
app.on("ready", () => {

  /* Crea la ventana */
  global.win = new BrowserWindow({
    /* Propiedades de la ventana */
    width: 1500,
    height: 800,
    title: "Hola Mundo",
    center: true,
    /* maximizable: false, */
    show: false
  });
  setIpcMain(global.global.win)
  handleErrors(global.global.win);

  global.global.win.once("ready-to-show", () => {
    global.global.win.show();
  });

  /*  get position of the windows */
  global.win.on("move", () => {
    const position = global.win.getPosition();
    /* console.log(`la posicion es ${position}`) */
  });

  /* Detecta el cierre de la ventana para cerrar el aplicativo */
  global.win.on("closed", () => {
    (global.win = null), app.quit();
  });

  /* Elimina la barra de menu */
  global.win.setMenu(null);

  /* Peticiones a un servidor */
  global.win.loadURL(`file://${__dirname}/renderer/index.html`);
  global.win.toggleDevTools();
});

