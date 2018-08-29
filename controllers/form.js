/**
 * GET /picture/form
 * Form.
 */
exports.getForm = (req, res) => {
  res.render('form', {
    title: 'File Upload',
  });
};


exports.postForm = (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('errors', { msg: 'You must be logged in to perform this action' });
    return res.redirect('/picture/form');
  }
  res.redirect('/picture/form');
};

