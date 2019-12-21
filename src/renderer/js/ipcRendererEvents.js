import { ipcRenderer } from "electron"

function clearImages(){
    const oldImages = document.querySelectorAll("li.list-group-item")


    for(let i = 0, lengthl = oldImages.length; i < lengthl; i++){
        oldImages[i].parentNode.removeChild(oldImages[i])
    }
}

function setIpc(){
    clearImages()
    ipcRenderer.on("load-images", (event, images) =>{
        console.log(images)
    })
}

function openDirectory(){
    ipcRenderer.send("open-directory")
}

module.exports = {
    setIpc: setIpc,
    openDirectory: openDirectory
}