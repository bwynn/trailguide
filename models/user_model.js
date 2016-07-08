const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Review = require('./review_model'),
      bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
  creds: {
    email: String,
    password: String
  },
  location: {
    zipcode: Number,
    city: String
  },
  bikes: [{
    brand: String,
    year: Number,
    model: String,
    picture: {type: Schema.Types.Mixed}
  }],
  profile: {
    username: String,
    firstname: String,
    lastname: String,
    picture: {type: Schema.Types.Mixed}
  }
});

// generate hash with bcrypt
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// validate password
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.creds.password);
};

module.exports = mongoose.model('User', UserSchema);
