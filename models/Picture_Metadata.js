// Reference: https://schema.org/GeoCoordinates
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true },

  picture: { type: mongoose.Schema.Types.ObjectId, ref: 'Picture' },
  
  deleted: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  version: {
    number: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  geo: {
    latitude: Number,
    longitude: Number,
    elevation: Number,
  },
  time: {
    captured: { type: Date },
    capturedAlt: { type: Date },
  },
  angles: {
    yaw: Number,
    pitch: Number,
    roll: Number,
  },
  rating: [{
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Rating' },
    value: Number
  }],
  caption: String,
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  buildings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Building' }],
}, {
  timestamps: true,
  versionKey: true
});


const Picture_Metadata = mongoose.model('Meta', userSchema);

module.exports = Picture_Metadata;
