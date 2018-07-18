const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  description: string,
}, { timestamps: true });


const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;
