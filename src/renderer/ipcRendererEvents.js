import { ipcRenderer } from "electron"
import {addImagesEvents, clearImages, loadImages ,selectFirsImage} from "./images-iu"
import { saveImage } from "./filters"
import path from "path"

function setIpc(){
    ipcRenderer.on("load-images", (event, images) =>{
        clearImages()
        loadImages(images)
        addImagesEvents()
        selectFirsImage()
    })

    ipcRenderer.on("save-image", (event, file) =>{
        saveImage(file)
    })
}


function openDirectory(){
    ipcRenderer.send("open-directory")
}

function saveFile(){
    const image = document.getElementById("image-displayed").dataset.original
    console.log(image)
    const ext = path.extname(image)
    ipcRenderer.send("open-save-dialog", ext)

}

module.exports = {
    setIpc: setIpc,
    saveFile: saveFile,
    openDirectory: openDirectory
}
