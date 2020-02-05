import { ipcRenderer, remote } from "electron";
import {
  addImagesEvents,
  clearImages,
  loadImages,
  selectFirsImage
} from "./images-iu";
import settings from "electron-settings"
import { saveImage } from "./filters";
import path from "path";
import os from "os"

function setIpc() {
  if(settings.has("directory")){
    ipcRenderer.send("load-directory", settings.has("directory"))
  } 
  ipcRenderer.on("load-images", (event,dir, images) => {
    clearImages();
    loadImages(images);
    addImagesEvents();
    selectFirsImage();
    settings.set("directory", dir)
  });

  ipcRenderer.on("save-image", (event, file) => {
    saveImage(file, err => {
      if (err) {
        return showDialog(
          /* "error" */ "info",
          "Pics",
          /*  err.message */ "hey! no has editado la img, no hagas replicas =]"
        );
      }
      showDialog("info", "Pics", "La imagen fue guardada");
    });
  });
}

function openPreferences() {
  const BrowserWindow = remote.BrowserWindow;
  const mainWindow = remote.getGlobal("win")

  const preferencesWindow = new BrowserWindow({
    width: 400,
    height: 300,
    title: "Preferencias",
    center: true,
    modal: true,
    frame: false,
    show: false
  });

  if(os.platform() !== "win32" ){
    preferencesWindow.setParentWindow(mainWindow)
  }
  /*  */
  preferencesWindow.once("ready-to-show", () => {
    preferencesWindow.show();
    preferencesWindow.focus();
  })
  
  preferencesWindow.loadURL(`file://${path.join(__dirname, "..")}/preferences.html`)
}
function openDirectory() {
  ipcRenderer.send("open-directory");
}

function showDialog(type, title, msg) {
  ipcRenderer.send("show-dialog", { type: type, title: title, message: msg });
}
function saveFile() {
  //Extecion de la img
  const image = document.getElementById("image-displayed").dataset.original;
  console.log(image);
  const ext = path.extname(image);
  ipcRenderer.send("open-save-dialog", ext);
}

module.exports = {
  setIpc: setIpc,
  saveFile: saveFile,
  openDirectory: openDirectory,
  openPreferences: openPreferences
};
