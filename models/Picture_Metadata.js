// Reference: https://schema.org/GeoCoordinates
const mongoose = require('mongoose');

const metaSchema = new mongoose.Schema({
  id: { type: Number, unique: true },

  deleted: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  version: {
    number: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },

  file: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Upload' }],

  name: String,
  geo: {
    latitude: Number,
    longitude: Number,
    elevation: Number,
    address: String,
    address_additional: String,
    postalCode: Number,
    addressCountry: String
  },
  time: {
    captured: { type: Date },
    capturedAlt: { type: Date },
    built: { type: Date },
    builtAlt: { type: Date },
    unbuilt: { type: Date },
    unbuiltAlt: { type: Date },
    unbuilt_type: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' },
  },
  angles: {
    yaw: Number,
    pitch: Number,
    roll: Number,
  },
  rating: [{
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Rating' },
    value: Schema.Types.Mixed
  }],
  caption: String,
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
}, {
  timestamps: true,
  versionKey: true
});


const Picture_Metadata = mongoose.model('Meta', metaSchema);

module.exports = Picture_Metadata;
