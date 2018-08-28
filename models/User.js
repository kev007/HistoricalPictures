const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  facebook: String,
  twitter: String,
  google: String,
  linkedin: String,
  tokens: Array,

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  },

  gamification: {
    adminPrivileges: { type: Boolean, default: false },
    exp: { type: Number, default: 0 },
    uploadCount: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    strikes: { type: Number, default: 0 },
    achievements: [{type: mongoose.Schema.Types.ObjectId, ref: 'Achievements'}],
  }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};


/**
 * Helper method for gamification: Experience.
 */
userSchema.methods.addExperience = function addExperience(value) {
  this.gamification.exp += value;
};
/**
 * Helper method for gamification: uploadCount.
 */
userSchema.methods.incrementUpload = function incrementUpload(value) {
  this.gamification.uploadCount += value;
};
/**
 * Helper method for gamification: reviewCount.
 */
userSchema.methods.incrementReviews = function incrementReviews(value) {
  this.gamification.reviewCount += value;
};



const User = mongoose.model('User', userSchema);

module.exports = User;
