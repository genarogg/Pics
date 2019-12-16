"use strict"

/* Instanciado los objetos app y BrowserWindow */
import { app, BrowserWindow } from "electron";
import devTools from "./devTools"

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
    let win = new BrowserWindow({
        /* Propiedades de la ventana */
        width: 800,
        height:600,
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
    /* win.toggleDevTools(); */
})