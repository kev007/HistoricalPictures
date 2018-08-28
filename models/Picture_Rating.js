const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  description: String,
  type: String,
  range: {
    start: Schema.Types.Mixed,
    end: Schema.Types.Mixed
  }
});


const Picture_Rating = mongoose.model('Rating', ratingSchema);

module.exports = Picture_Rating;
