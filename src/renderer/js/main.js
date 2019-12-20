import url from "url"
import path from "path"
import applyFilter from "./js/filters"
import { setIpc, sendIpc } from "./js/ipcRendererEvents";

window.addEventListener("load", () => {
    
    setIpc()
    
    addImagesEvents()
    searImagesEvent()
    selectEvent()
    openDirectory()
});

function openDirectory(){
    const openDirectory = document.getElementById("open-directory")

    openDirectory.addEventListener("click", () => {
        sendIpc()
    })
}

function addImagesEvents(){
    const thumbs = document.querySelectorAll("li.list-group-item");

    for(let i = 0, lengthl = thumbs.length; i < lengthl; i++){
        thumbs[i].addEventListener("click", function() {
            changeImage(this)
        })
    }

    
}

function selectEvent (){
    const select = document.getElementById("filters")

    select.addEventListener("change", function () {
        applyFilter(this.value, document.getElementById("image-displayed"))
    })
}

function changeImage (node) {

    if(node){
        document.querySelector("li.selected").classList.remove("selected");

        node.classList.add("selected")
        
        document.getElementById("image-displayed").src = node.querySelector("img").src

    }
    else{
        document.getElementById("image-displayed").src = ""
    }

}

function searImagesEvent(){
    
    const searchBox = document.getElementById("search-box")

    searchBox.addEventListener("keyup", function() {
        const regex = new RegExp(this.value.toLowerCase(), "gi")
        
        if(this.value.length > 0){
            const thumbs = document.querySelectorAll("li.list-group-item img");
            
            for ( let i = 0, lengthl = thumbs.length; i < lengthl; i++){
                const fileUrl = url.parse(thumbs[i].src)
                const fileName = path.basename(fileUrl.path)
                
                if(fileName.match(regex)){
                    thumbs[i].parentNode.classList.remove("hidden")
                }
                else{
                    thumbs[i].parentNode.classList.add("hidden")
                }
            }
            selectFirsImage()
        }
        
        else{
            const hidden = document.querySelectorAll("li.hidden")

            for(let i = 0, lengthl = hidden.length; i < lengthl; i++){
                hidden[i].classList.remove("hidden")
            }
        }
    })
}



function selectFirsImage(){
    const image = document.querySelector("li.list-group-item:not(.hidden)")
    changeImage(image)
}