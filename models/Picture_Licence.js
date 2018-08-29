const mongoose = require('mongoose');

const licenceSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  short: String,
  description: String,
  url: String
}, { timestamps: true });


const Picture_Licence = mongoose.model('Licence', licenceSchema);

module.exports = Picture_Licence;
