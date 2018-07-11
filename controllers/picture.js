const Picture = require('../models/Picture');

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
  const picture = new Picture({
    filename: req.file.filename,
    user: req.user.id,
    file: req.file
  });

  picture.save((err) => {
    if (err) { return err; }
    req.flash('success', { msg: 'File was uploaded successfully.' });
    res.redirect('/picture/upload');
  });
};
