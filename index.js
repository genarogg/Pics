"use strict"

const { app, BrowserWindow } = require("electron");



app.on("before-quit", () => {
    console.log("Saliendo...");
});

app.on("ready", () =>{
    let win = new BrowserWindow();

    win.on("closed", () => {
        win = null,
        app.quit()
    })
})
