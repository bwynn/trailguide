const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Review = require('./review_model');

const TrailSchema = new Schema({
  coords: {
    lat: String,
    lng: String,
  },
  featuredImg: {type: Schema.Types.Mixed},
  keywords: [String],
  pictures: [{type: Schema.Types.Mixed}],
  profile: {
    description: String,
    fitnessLevel: String,
    skillLevel: String,
    access: String,
  },
  userReviews: [{Review.schema}]
});

module.exports = mongoose.model('Trail', TrailSchema);
