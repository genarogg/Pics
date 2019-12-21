import { ipcRenderer } from "electron"

function clearImages(){
    const oldImages = document.querySelectorAll("li.list-group-item")


    for(let i = 0, lengthl = oldImages.length; i < lengthl; i++){
        oldImages[i].parentNode.removeChild(oldImages[i])
    }
}

function loadImages (images){

    const imagesList = document.querySelector("ul.list-group")
    

    for(let i = 0, lengthl = images.length; i < lengthl; i++){
        images[i]

        const node = `<li class="list-group-item">
                        <img class=" media-object pull-left" src="${images[i].src}"  height="32">
                        <div class="media-body">
                            <strong>${images[i].filename}</strong>
                            <p>${images[i].size}</p>
                        </div>
                    </li>`

        imagesList.insertAdjacentHTML("beforeend", node)
    }
}

function setIpc(){
    clearImages()
    ipcRenderer.on("load-images", (event, images) =>{
        loadImages(images)
    })
}

function openDirectory(){
    ipcRenderer.send("open-directory")
}

module.exports = {
    setIpc: setIpc,
    openDirectory: openDirectory
}