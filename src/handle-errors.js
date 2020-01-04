import { app, dialog } from "electron"

function relaunchApp (win) {
    dialog.showMessageBox(win, {
        type: "error",
        title: "Platzipics",
        message: "Ocurrio un error inesperado, se reiniciará el aplicativo"
    }, () => {
        app.relaunchApp()
        app.exit(0)
    })
}
function setupErrors (win) {
    win.webContents.on("crashed", () => {
        relaunchApp(win)
    })
}

module.exports = setupErrors