const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
  filename: { type: String, unique: true }

});


const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;