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
        saveImage(file, (err) => {
            if(err){
                return showDialog(/* "error" */ "info", "Pics",/*  err.message */ "hey! no has editado la img, no hagas replicas =]")
            }
            showDialog("info", "Pics", "La imagen fue guardada")
        })
    })
}


function openDirectory(){
    ipcRenderer.send("open-directory")
}

function showDialog(type, title, msg){
    ipcRenderer.send("show-dialog", {type: type, title: title, message: msg})
}
function saveFile(){ //Extecion de la img
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
