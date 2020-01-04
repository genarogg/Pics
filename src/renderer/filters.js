import fse from "fs-extra";

function applyFilter(filter, currentImage) {
  let imgObj = new Image();
  imgObj.src = currentImage.src; //eslint-disable-line

  filterous
    .importImage(imgObj, {}) //eslint-disable-line
    .applyInstaFilter(filter)
    .renderHtml(currentImage);
}

function saveImage(fileName, callback) {
  let fileSrc = document.getElementById("image-displayed").src;

  if (fileSrc.indexOf(";base64,") !== -1) {
    fileSrc = fileSrc.replace(/^data:([A-Za-z-+/]+);base64,/, " ");
    fse.writeFile(fileName, fileSrc, "base64", callback);
  } 
  
  else {
    //Error Critico
    fileSrc = fileSrc.replace("file://", "");
    console.log(fileSrc)

    fse.copy(fileSrc, fileName, callback);
  }
}

module.exports = {
  applyFilter: applyFilter,
  saveImage: saveImage
};
