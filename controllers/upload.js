const ExifImage = require('exif').ExifImage;
const Upload = require('../models/Upload');
const User = require('../models/User');
const Gamification = require('./applicationLogic/gamification.js');

function saveFilesForUser(files, userId) {
  User.findById(userId, (err, user) => {
    if (err) { return err; }

    files.forEach((file) => {
      const exif = ExifImage({ image: `./uploads/${file.filename}` }, (error, exifData) => exifData.exifData);

      const upload = new Upload({
        filename: file.filename,
        user: user._id,
        file,
        exif
      });

      upload.save((err) => {
        if (err) { return err; }
      });
    });

    Gamification.rewardUserUploads(user, files);
    user.save();
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

  saveFilesForUser(req.files, req.user.id);

  req.flash('success', { msg: `${req.files.length} files uploaded successfully.` });
  res.redirect('/picture/upload');
};
