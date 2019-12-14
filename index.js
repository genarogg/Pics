"use strict"

/* Instanciado los objetos app y BrowserWindow */
const { app, BrowserWindow } = require("electron");

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
        maximizable: false
    });

    /*  get position of the windows */
    win.on("move", () =>{
        const position = win.getPosition();
        console.log(`la posicion es ${position}`)
    })

    /* Detecta el cierre de la ventana para cerrar el aplicativo */
    win.on("closed", () => {
        win = null,
        app.quit()
    })
})
