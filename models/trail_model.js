const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Review = require('./review_model');

const TrailSchema = new Schema({
  title: String,
  coords: [Number], // long, lat
  city: String,
  featuredImg: {type: Schema.Types.Mixed},
  keywords: [String],
  profile: {
    description: String,
    fitnessLevel: String,
    skillLevel: String,
    access: String,
  },
  rating: [Number]
});

module.exports = mongoose.model('Trail', TrailSchema);
