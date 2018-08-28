const tag = require('../models/Picture_Tag')

exports.postNewTag = (req, res, next) => {
    console.log('Hallo World');
    res.redirect('/tags')

}

exports.getAllTags = (req, res) => {
    res.render('tags', {
        title: 'All Tags'
    });

}