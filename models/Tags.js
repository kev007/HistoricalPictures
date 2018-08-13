const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  tagName: { type: String, unique: true }});


const Tag = mongoose.model('tag', tagSchema);

module.exports = Tag;