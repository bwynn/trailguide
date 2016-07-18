const Review = require("../models/review_model"),
      Trail = require("../models/trail_model");

// get reviews
// /get_reviews - GET
exports.getReviews = function(req, res) {
  Review.find(function(err, reviews) {
    if (err) {
      res.send(err);
    }

    res.json(reviews);
  });
};

// get review by author
// /get_review_author - POST
exports.getReviewByAuthor = function(req, res) {
  Review.find({authorID: req.body.authorID}, function(err, reviews) {
    if (err) {
      res.send(err);
    }

    res.json(reviews);
  });
};

// get review by trail
// /get_review_trail - POST
exports.getReviewByTrail = function(req, res) {
  Review.find({trailID: req.body.trailID}, function(err, reviews) {
    if (err) {
      res.send(err);
    }

    res.json(reviews);
  })
};

// get review by ID
// get_review - POST
exports.getReviewByID = function(req, res) {
  Review.findOne({_id: req.body.id}, function(err, review) {
    if (err) {
      res.send(err);
    }

    res.json(review);
  });
};

// add review
// /add_review - POST
exports.addReview = function(req, res) {

  const review = new Review();

  review.authorID = req.session.passport.user;
  review.trailID = req.body.trailID;
  review.rating = req.body.rating;
  review.comment = req.body.comment;
  review.pictures = req.body.pictures;

  review.save(function(err, review) {
    if (err) {
      res.send(err);
    }

    res.json(review);
  });
};

// update review
// /update_review - PUT
exports.updateReview = function(req, res) {
  Review.find({authorID: req.session.passport.user}, function(err, reviews) {
    Review.update({_id: req.body.reviewID}, {
      rating: req.body.rating,
      comment: req.body.comment,
      pictures: req.body.pictures
    }, function(err, review) {
      if (err) {
        res.send(err);
      }

      res.json(review);
    });
  });
};

// delete review
// /delete_review - PUT
exports.deleteReview = function(req, res) {
  Review.find({authorID: req.body.userID}, function(err, review) {
    Review.remove({_id: req.body.reviewID}, function(err, review) {
      if (err) {
        res.send(err);
      }

      res.json({message: "Review Successfully removed"});
    });
  });
};
