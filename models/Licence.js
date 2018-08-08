const mongoose = require('mongoose');

const licenceSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  description: String,
}, { timestamps: true });


const Licence = mongoose.model('Licence', licenceSchema);

module.exports = Licence;
