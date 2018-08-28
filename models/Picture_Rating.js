const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  description: String,
  url: String,
  range: {
    start: Number,
    end: Number
  }
});


const Picture_Rating = mongoose.model('Rating', ratingSchema);

module.exports = Picture_Rating;
