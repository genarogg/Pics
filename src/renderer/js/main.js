import url from "url"
import path from "path"

window.addEventListener("load", () => {
    addImagesEvents()
    searImagesEvent()
});

function addImagesEvents(){
    const thumbs = document.querySelectorAll("li.list-group-item");

    for(let i = 0, lengthl = thumbs.length; i < lengthl; i++){
        thumbs[i].addEventListener("click", function() {
            changeImage(this)
        })
    }

    
}

function changeImage (node) {

    document.querySelector("li.selected").classList.remove("selected");

    node.classList.add("selected")
    
    document.getElementById("image-displayed").src = node.querySelector("img").src
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
        }
    })
}