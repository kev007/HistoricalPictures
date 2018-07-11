const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
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


const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
