import { ipcRenderer, remote } from "electron";
import settings from "electron-settings";
import {
  addImagesEvents,
  clearImages,
  loadImages,
  selectFisrtImage
} from "./images-ui";
import { saveImage } from "./filters";
import Cloudup from "cloudup-client";
import crypto from "crypto";
import path from "path";
import os from "os";

function setIpc() {
  if (settings.has("directory")) {
    ipcRenderer.send("load-directory", settings.get("directory"));
  }

  ipcRenderer.on("load-images", (event, dir, images) => {
    clearImages();
    loadImages(images);
    addImagesEvents();
    selectFisrtImage();
    settings.set("directory", dir);
    document.getElementById("directory").innerHTML = dir;
  });

  ipcRenderer.on("save-image", (event, file) => {
    saveImage(file, err => {
      if (err) return showDialog("error", "Platzipics", err.message);

      showDialog("info", "Platzipics", "La imagen fue guardada");
    });
  });
}

function openPreferences() {
  const BrowserWindow = remote.BrowserWindow;
  const mainWindow = remote.getGlobal("win");

  const preferencesWindow = new BrowserWindow({
    width: 400,
    height: 300,
    title: "Preferencias",
    center: true,
    modal: true,
    frame: false,
    show: false
  });

  if (os.platform() !== "win32") {
    preferencesWindow.setParentWindow(mainWindow);
  }

  preferencesWindow.once("ready-to-show", () => {
    preferencesWindow.show();
    preferencesWindow.focus();
  });

  preferencesWindow.loadURL(
    `file://${path.join(__dirname, "..")}/preferences.html`
  );
}

function openDirectory() {
  ipcRenderer.send("open-directory");
}

function showDialog(type, title, msg) {
  ipcRenderer.send("show-dialog", { type: type, title: title, message: msg });
}

function saveFile() {
  const image = document.getElementById("image-displayed").dataset.original;
  const ext = path.extname(image);

  ipcRenderer.send("open-save-dialog", ext);
}

function uploadImage() {
  let image = document.getElementById("image-displayed").src;
  image = image.replace("file://");
  let fileName = path.basename(image);

  if (settings.has("cloudup.user") && settings.has("cloudup.passwd")) {
    const decipher = crypto.createDecipher("aes192", "Platzipics");
    let decrypted = decipher.update(
      settings.get("cloudup.passwd"),
      "hex",
      "utf8"
    );
    decrypted += decipher.final("utf8");

    const client = Cloudup({
      user: settings.get("cloudup.user"),
      pass: decrypted
    });

    const stream = client.stream({ title: `Platzipics - ${fileName}` });
    stream.file(image).save((error) =>{
      if(error){
        showDialog(
          "error",
          "Platzi",
          "Verifique su coneccion o credenciales"
        ); 
      }

        else{
          showDialog(
            "error",
            "Platzi",
            `Imagen cargada con exito - ${stream.url}`
          );
        }
    })
  } else {
    showDialog(
      "error",
      "Platzi",
      "Por favor complete las preferencias de cloudup."
    );
  }
}

module.exports = {
  setIpc: setIpc,
  saveFile: saveFile,
  openDirectory: openDirectory,
  openPreferences: openPreferences,
  uploadImage: uploadImage

};
