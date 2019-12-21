import { ipcRenderer } from "electron"
import {addImagesEvents, clearImages, loadImages ,selectFirsImage} from "./images-iu"

function setIpc(){
    ipcRenderer.on("load-images", (event, images) =>{
        clearImages()
        loadImages(images)
        addImagesEvents()
        selectFirsImage()
    })
}

function openDirectory(){
    ipcRenderer.send("open-directory")
}

function saveFile(){
    ipcRenderer.send("open-save-dialog")

}

module.exports = {
    setIpc: setIpc,
    openDirectory: openDirectory,
    saveFile: saveFile
}
