const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Review = require('./review_model');

const TrailSchema = new Schema({
  title: String,
  coords: {
    lat: Number,
    lng: Number
  }, // long, lat
  city: String,
  featuredImg: {type: Schema.Types.Mixed},
  keywords: [String],
  profile: {
    description: String,
    fitnessLevel: Number,
    skillLevel: Number,
    access: String,
  },
  rating: [Number],
  author: {type: Schema.Types.Mixed},
  createdOn: {type: Date},
  lastModified: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Trail', TrailSchema);
