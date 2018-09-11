const Picture = require('../../models/Picture');
const Gallery = require('express-photo-gallery');
// const openseadragon = require('openseadragon');
const superagent = require('superagent');
// const consolidate = require('consolidate');

const fs = require('fs');
const path = require('path');

function getImagesFromDir(dirPath) {

  // All iamges holder, defalut value is empty
  let allImages = [];

  // Iterator over the directory
  let files = fs.readdirSync(dirPath);

  // Iterator over the files and push jpg and png images to allImages array.
  for (file of files) {
    let fileLocation = path.join(dirPath, file);
    var stat = fs.statSync(fileLocation);
    if (stat && stat.isDirectory()) {
      getImagesFromDir(fileLocation); // process sub directories
    } else if (stat && stat.isFile() && ['.jpg', '.png'].indexOf(path.extname(fileLocation)) != -1) {
      allImages.push('../../uploads/thumbs/' + file); // push all .jpf and .png files to all images
    }
  }

  // return all images in array formate
  return allImages;
}

exports.getPictureOverView = (req, res) => {


  let options = {
    title: 'My Awesome Photo Gallery'
  };

  let images = getImagesFromDir(path.join(__dirname, '../../uploads/thumbs'));
  res.render('picture/picture_overview', { title: 'Node js – Auto Generate a Photo Gallery from a Directory', images: images })
}
