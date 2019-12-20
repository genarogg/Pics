function applyFilter ( filter, currentImage){
    
    let imgObj = new Image()
    imgObj.src = currentImage.src //eslint-disable-line

    filterous.importImage(imgObj, {}) //eslint-disable-line
                .applyInstaFilter(filter)
                .renderHtml(currentImage)
}

module.exports = applyFilter