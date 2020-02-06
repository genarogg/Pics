import {remote, ipcRenderer} from "electron"
import settings from "electron-settings"


window.addEventListener("load", () => {
    cancelButton()
    saveButton ()
})

function cancelButton () {
    const cancelButton = document.getElementById("cancel-button")
    cancelButton.addEventListener("click", () => {
        const prefsWindow = remote.getCurrentWindow()
        prefsWindow.close()
    })
}

function saveButton () {
    const saveButton = document.getElementById("save-button")
    const prefsForm = document.getElementById("preferences-form")
    saveButton.addEventListener("click", () => {
        if(prefsForm.reportValidity()){
            settings.set("cloudup.user", document.getElementById("cloudup-user").value)
            settings.set("cloudup.user", document.getElementById("cloudup-passwd").value)
            const prefsWindow = remote.getCurrentWindow()
            prefsWindow.close()
        }
        else{
            ipcRenderer.send("show-dialog", { type: "error", title: "Pics | Genarogg", message: "Complete los campos requeridos." });
        }
        
    })
}