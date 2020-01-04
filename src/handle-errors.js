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

    win.on("unresponsive", () => {
        dialog.showMessageBox(win, {
            type: "warning",
            title: "Platzipics",
            message: "Un proceso está tardando demasiado, puede esperar o reinicar la aplicacion"
        })

    })

    process.on("uncaughtException", () => {
        relaunchApp(win)
    })
}

module.exports = setupErrors