const tag = require('../models/Picture_Tag')

exports.postNewTag = (req, res, next) => {
  var msg =   res.querySelector("#vorname").value;

  console.log(msg);
  res.redirect('/tags')

}

exports.getAllTags = (req, res) => {
    res.render('tags', {
        title: 'All Tags'
    });

}
