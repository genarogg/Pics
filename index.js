"use strict"

const { app } = require("electron");

console.dir(app)

app.on("before-quit", () => {
    console.log("Saliendo...");
});

app.quit();