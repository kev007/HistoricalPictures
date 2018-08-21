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


const Upload_Rating = mongoose.model('Rating', ratingSchema);

module.exports = Upload_Rating;
