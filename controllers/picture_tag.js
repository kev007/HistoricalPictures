const Tag = require('../models/Picture_Tag')

exports.postNewTag = (req, res, next) => {

  let tagname = req.body.tagname;
  const pictureTag = new Tag({
    name: tagname,
    altNames: [],
    pictures: []
  });

  Object.entries(req.body).forEach((element) => {
    if (element[0].search('addOptionalTag') !== -1) {
      pictureTag.altNames.push(element[1]);
    }
  });

  //save created object
  pictureTag.save((error) => {
    if (error) {
      req.flash('errors', { msg: $(error) + `Errors: Tag not saved.` });
    }
    res.redirect('/picturetags')
  });


}

exports.getAllTags = (req, res) => {
    res.render('picturetags', {
        title: 'All Tags'
    });

}
