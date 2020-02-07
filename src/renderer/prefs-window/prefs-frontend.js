import {remote, ipcRenderer} from "electron"
import settings from "electron-settings"
import crypto from "crypto"


window.addEventListener("load", () => {
    cancelButton()
    saveButton()

    if(settings.has("cloudup.user")){
        document.getElementById("cloudup-user").value = settings.get("cloudup.user")
    }

    if(settings.has("cloudup.passwd")){
        /* const decipher = crypto.createDecipher("aes192", "Platzipics")
        let decrypted = decipher.update(settings.get("cloudup.user"), "hex", "utf8")
        decrypted += decipher.final("utf8")
        document.getElementById("cloudup-passwd").value = decrypted */
    }
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
            const cipher = crypto.createCipher("aes192", "Platzipics")
            let encryted = cipher.update(document.getElementById("cloudup-passwd").value)
            encryted += cipher.final("hex")

            settings.set("cloudup.user", document.getElementById("cloudup-user").value)
            settings.set("cloudup.passwd", encrypted)
            const prefsWindow = remote.getCurrentWindow()
            prefsWindow.close()
        }
        else{
            ipcRenderer.send("show-dialog", { type: "error", title: "Pics | Genarogg", message: "Complete los campos requeridos." });
        }
        
    })
}