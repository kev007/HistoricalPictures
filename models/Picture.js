const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
  filename: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  licence: { type: mongoose.Schema.Types.ObjectId, ref: 'Licence' },
  licenceHolder: String,
  file: {
    destination: String,
    encoding: String,
    fieldname: String,
    filename: String,
    mimetype: String,
    originalname: String,
    path: String,
    size: Number
  },
  exif: Object,
}, { timestamps: true });


const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;
