const ExifImage = require('exif').ExifImage;
const Upload = require('../models/Upload');
const User = require('../models/User');
const Gamification = require('./applicationLogic/gamification.js');


function saveFile(file, user) {
  return new Promise((resolve, reject) => {
    const status = {
      name: file.originalname,
      saved: false,
      messages: []
    };

    new ExifImage({image: `./uploads/${file.filename}`}, function (error, exifData) {
      if (error) status.messages.push(error);

      //create new Upload object
      const upload = new Upload({
        filename: file.filename,
        user: user._id,
        file,
        exif: exifData
      });

      //save created object
      upload.save((error) => {
        if (error) status.messages.push(error);
        else status.saved = true;
        resolve(status)
      });
    });
  });
}

function saveAllFilesForUser(files, userId) {
  return new Promise((resolve, reject) => {
    const promises = [];

    User.findById(userId, (error, user) => {
      if (error) reject(error);

      files.forEach((file) => {
        promises.push(saveFile(file, user));
      });

      Promise.all(promises).then(function (values) {
        //reward user, then save
        Gamification.rewardUserUploads(user, files);
        user.save();
        resolve(values);
      });
    });
  });
}


  /**
 * GET /picture/upload
 * File Upload API example.
 */
exports.getFileUpload = (req, res) => {
  res.render('api/upload', {
    title: 'File Upload'
  });
};

exports.postFileUpload = (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('errors', { msg: 'You must be logged in to perform this action' });
    return res.redirect('/picture/upload');
  }
  if (!req.hasOwnProperty('files')) {
    req.flash('errors', { msg: 'Nothing to upload' });
    return res.redirect('/picture/upload');
  }

  saveAllFilesForUser(req.files, req.user.id).then(function (resolved, reject) {
    //display upload messages
    resolved.forEach((status) => {
      if (status.saved && status.messages.length === 0) {
        req.flash('success', { msg: `Uploaded successfully: ${status.name}` });
      } else if (status.saved && status.messages.length > 0) {
        status.messages.forEach((message) => {
          req.flash('info', { msg: `${status.name} was uploaded with warning - ${message.toString()}` });
        });
      }
      if (!status.saved) {
        req.flash('errors', { msg: `${status.name} uploaded with errors.` });
        //TODO: check if it's in the filesystem, then delete?
      }
    });
    res.redirect('/picture/upload');
  });
};
