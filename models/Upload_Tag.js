const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  altNames: [String]
});


const Upload_Tag = mongoose.model('Tag', tagSchema);

module.exports = Upload_Tag;
