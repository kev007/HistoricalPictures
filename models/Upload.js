const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
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
  exif: Object
}, { timestamps: true });


const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
