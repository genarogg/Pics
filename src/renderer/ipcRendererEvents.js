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

module.exports = {
    setIpc: setIpc,
    openDirectory: openDirectory
}
