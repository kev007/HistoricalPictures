const Tag = require('../models/Picture_Tag');

/**
 * GET /form
 * Form.
 */
exports.getForm = (req, res) => {
  Tag.find({}, (error, tags) => {
    if (error) console.log(error);
    res.render('form', {
      title: 'Form',
      tags: JSON.stringify(tags)
    });
  });
};


exports.postForm = (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('errors', { msg: 'You must be logged in to perform this action' });
    return res.redirect('/form');
  }
  res.redirect('/form');
};

