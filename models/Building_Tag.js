// Reference: https://schema.org/GeoCoordinates
const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
  id: { type: Number, unique: true },

  name: String,
  altNames: [String],

  deleted: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  version: {
    number: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },

  // all the pictures that contain this tag
  pictures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Picture' }],

  geo: {
    latitude: Number,
    longitude: Number,
    elevation: Number,
    street: String,
    house_number: String,
    postalCode: Number,
    addressCountry: { type: String, default: "DE" }
  },
  time: {
    built: { type: Date },
    builtAlt: { type: Date },
    unbuilt: { type: Date },
    unbuiltAlt: { type: Date },
    unbuilt_type: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' },
  }
}, {
  timestamps: true,
  versionKey: true
});


const Building_Tag = mongoose.model('Building', buildingSchema);

module.exports = Building_Tag;
