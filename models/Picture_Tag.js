const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  altNames: [String],
  pictures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Picture' }]
});


const Picture_Tag = mongoose.model('Tag', tagSchema);

module.exports = Picture_Tag;
