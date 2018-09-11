const ExifImage = require('exif').ExifImage;
const Picture = require('../../models/Picture');
const User = require('../../models/User');
const Licence = require('../../models/Picture_Licence');
const Gamification = require('../applicationLogic/gamification.js');
const createThumbs = require('../applicationLogic/createThumbs');

const path = require('path');


function saveFile(file, user, body) {
  return new Promise((resolve, reject) => {
    const status = {
      name: file.originalname,
      saved: false,
      exif: false,
      messages: []
    };

    new ExifImage({image: `./uploads/${file.filename}`}, function (error, exifData) {
      if (error) status.messages.push(error);
      else status.exif = true;

      //create new Picture object
      const picture = new Picture({
        filename: file.filename,
        user: user._id,
        licence: body.licence,
        licenceHolder: body.licenceHolder,
        file,
        exif: exifData
      });

      //save created object
      picture.save((error) => {
        if (error) status.messages.push(error);
        else status.saved = true;
        resolve(status)
      });
    });
  });
}

function saveAllFilesForUser(files, userId, body) {
  return new Promise((resolve, reject) => {
    const promises = [];

    User.findById(userId, (error, user) => {
      if (error) reject(error);

      files.forEach((file) => {
        promises.push(saveFile(file, user, body));
      });

      Promise.all(promises).then(function (values) {
        //reward user, then save
        Gamification.rewardUserUploads(user, values);
        user.save();
        resolve(values);
      });
    });
  });
}


/**
 * GET /picture/upload
 * File Picture API example.
 */
exports.getFileUpload = (req, res) => {
  Licence.find({}, (error, licences) => {
    if (error) console.log(error);
    res.render('picture/picture_upload', {
      title: 'File Upload',
      licences: licences
    });
  });
};

exports.postFileUpload = (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('errors', { msg: 'You must be logged in to perform this action' });
    return res.redirect('/picture/picture_upload');
  }
  if (!req.hasOwnProperty('files')) {
    req.flash('errors', { msg: 'Nothing to upload' });
    return res.redirect('/picture/picture_upload');
  }
  if (req.files.length === 0) {
    req.flash('errors', { msg: 'Nothing to upload' });
    return res.redirect('/picture/picture_upload');
  }


  saveAllFilesForUser(req.files, req.user.id, req.body).then(function (resolved, reject) {
    let saved = 0;
    //display upload messages
    resolved.forEach((status) => {
      if (status.saved) {
        saved++; //count the number of uploads saved to the database
        if (status.exif) {
          req.flash('success', { msg: `Uploaded successfully: ${status.name}` });
        }
        if (status.messages.length > 0) {
          status.messages.forEach((message) => {
            req.flash('info', {msg: `${status.name} was uploaded but did not contain any EXIF data - ${message.toString()}`});
          });
        }
      } else {
        req.flash('errors', { msg: `${status.name} uploaded with errors and could not be saved.` });
        status.messages.forEach((message) => {
          req.flash('errors', { msg: `${message.toString()}` });
        });
        //TODO: check if it's in the filesystem, then delete?
      }
    });

    createThumbs.createThumbs();
    if (saved > 0) {
      res.redirect('/picture/upload');
    } else {
      res.redirect('/picture/upload');
    }
  });
};
