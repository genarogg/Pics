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
        if(this.value.length > 0){
            const thumbs = document.querySelectorAll("li.list-group-item img");
            
            for ( let i = 0, lengthl = thumbs.length; i < lengthl; i++){
                console.log(thumbs[i].src)
            }
        }
    })
}