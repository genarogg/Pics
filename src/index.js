"use strict"

/* Instanciado los objetos app y BrowserWindow */
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import devTools from "./devTools"
import isImage from "is-image"
import path from "path"
import fs from "fs"
import fileSize from "filesize"

let win;

if(process.env.NODE_ENV === "development"){
    devTools()
}

/* Imprimiendo un mensaje en la consola antes de salir */
app.on("before-quit", () => {
    console.log("Saliendo...");
});

/* Ejecutando ordenes cuando la app esta lista */
app.on("ready", () =>{
    /* Crea la ventana */
    win = new BrowserWindow({
        /* Propiedades de la ventana */
        width: 1500,
        height:800,
        title: "Hola Mundo",
        center: true,
        /* maximizable: false, */
        show: false,
        
    });

    win.once("ready-to-show", () => {
        win.show()
    })

    /*  get position of the windows */
    win.on("move", () =>{
        const position = win.getPosition();
        /* console.log(`la posicion es ${position}`) */
    })

    /* Detecta el cierre de la ventana para cerrar el aplicativo */
    win.on("closed", () => {
        win = null,
        app.quit()
    })

    /* Elimina la barra de menu */
    win.setMenu(null)

    /* Peticiones a un servidor */
    win.loadURL(`file://${__dirname}/renderer/index.html`)
    win.toggleDevTools();
})

ipcMain.on("open-directory", (event) => {
    //se nesesita una validacion para windows  
   dialog.showOpenDialog(win, {
       title: "Seleccione la nueva ubiacacion",
        buttonLabel: "abrir Ubicacion",
        properties: ["openDirectory"]
   }, (dir) => {

        const images = []

        if(dir){
            fs.readdir(dir[0], (err,files) => {

                if(err)throw err

                for(let i = 0, lengthl = files.length; i < lengthl; i++){
                    if(isImage(files[i])){
                        let imageFile = path.join(dir[0], files[i])
                        let stats = fs.statSync(imageFile)
                        let size = fileSize(stats.size , { around: 0 })
                        images.push({filename: files[i], src: `file://${imageFile}`, size: size })
                    }
                }
                event.sender.send("load-images", images)
            })
        }
   })
})

ipcMain.on("open-save-dialog", (event, ext) => {
    
    dialog.showSaveDialog(win, {
        title: "Guardar imagen modificada",
        buttonLabel: "Guardar imagen",
        filters: [{name: "images",extensions: [ext.substr(1)]
        }]
    }, (file =>{
            if(file){
                event.sender.send("save-image", file)
            }
    }))
})