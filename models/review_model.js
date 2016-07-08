const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  authorID: String,
  rating: Number,
  comment: String,
  pictures: [{type: Schema.Types.Mixed}]
});

module.exports = mongoose.model('Review', ReviewSchema);
