// SEE: https://stackoverflow.com/questions/17246981/store-models-in-folder-use-index-js-to-require-them-all

const mongoose = require('mongoose');
//const User = require('User.js');

const pictureSchema = new mongoose.Schema({
  filename: { type: String, unique: true },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  file: {
    destination: String,
    encoding: String,
    fieldname: String,
    filename: String,
    mimetype: String,
    originalname: String,
    path: String,
    size: Number
  }
}, { timestamps: true });


const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;
