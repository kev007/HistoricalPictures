//SEE: https://stackoverflow.com/questions/17246981/store-models-in-folder-use-index-js-to-require-them-all

const mongoose = require('mongoose');
let User = require('./models/User')(mongoose);

const pictureSchema = new mongoose.Schema({
  filesystemPath: { type: String, unique: true },
  user: User
}, { timestamps: true });

const Picture = mongoose.model('Picture', pictureSchema);
