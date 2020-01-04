import { ipcMain, dialog } from "electron";
import isImage from "is-image";
import path from "path";
import fs from "fs";
import fileSize from "filesize";

function setMainIpc(win) {
  ipcMain.on("open-directory", event => {
    //se nesesita una validacion para windows
    dialog.showOpenDialog(
      win,
      {
        title: "Seleccione la nueva ubiacacion",
        buttonLabel: "abrir Ubicacion",
        properties: ["openDirectory"]
      },
      dir => {
        const images = [];

        if (dir) {
          fs.readdir(dir[0], (err, files) => {
            if (err) throw err;

            for (let i = 0, lengthl = files.length; i < lengthl; i++) {
              if (isImage(files[i])) {
                let imageFile = path.join(dir[0], files[i]);
                let stats = fs.statSync(imageFile);
                let size = fileSize(stats.size, { around: 0 });
                images.push({
                  filename: files[i],
                  src: `file://${imageFile}`,
                  size: size
                });
              }
            }
            event.sender.send("load-images", images);
          });
        }
      }
    );
  });

  ipcMain.on("open-save-dialog", (event, ext) => {
    dialog.showSaveDialog(
      win,
      {
        title: "Guardar imagen modificada",
        buttonLabel: "Guardar imagen",
        filters: [{ name: "images", extensions: [ext.substr(1)] }]
      },
      file => {
        if (file) {
          event.sender.send("save-image", file);
        }
      }
    );
  });

  ipcMain.on("show-dialog", (event, info) => {
    dialog.showMessageBox(win, {
      type: info.type,
      title: info.title,
      message: info.message
    });
  });
}

module.exports = setMainIpc;
