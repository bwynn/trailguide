"use strict";

const Review = require("../models/review_model"),
      Trail = require("../models/trail_model");

// get reviews
// /get_reviews - GET
exports.getReviews = (req, res) => {
  Review.find((err, reviews) => {
    if (err) {
      res.send(err);
    }

    res.json(reviews);
  });
};

// get review by author
// /get_review_author - POST
exports.getReviewsByAuthor = (req, res) => {
  Review.find({authorID: req.body.authorID}, (err, reviews) => {
    if (err) {
      res.send(err);
    }

    res.json(reviews);
  });
};

// get review by trail
// /get_review_trail - POST
exports.getReviewsByTrail = (req, res) => {
  Review.find({trailID: req.body.trailID}, (err, reviews) => {
    if (err) {
      res.send(err);
    }

    res.json(reviews);
  })
};

// get review by ID
// get_review - POST
exports.getReviewByID = (req, res) => {
  Review.findOne({_id: req.body.id}, (err, review) => {
    if (err) {
      res.send(err);
    }

    res.json(review);
  });
};

// add review
// /add_review - POST
exports.addReview = (req, res) => {

  const review = new Review();

  review.authorID = req.session.passport.user;
  review.trailID = req.body.trailID;
  review.trailTitle = req.body.trailTitle;
  review.rating = req.body.rating;
  review.comment = req.body.comment;
  review.pictures = req.body.pictures;

  review.save((err, review) => {
    if (err) {
      res.send(err);
    }

    res.json(review);
  });
};

// update review
// /update_review - PUT
exports.updateReview = (req, res) => {
  Review.find({authorID: req.body.userID}, (err, reviews) => {
    Review.update({_id: req.body.reviewID}, {
      rating: req.body.rating,
      comment: req.body.comment,
      pictures: req.body.pictures
    }, (err, review) => {
      if (err) {
        res.send(err);
      }

      res.json(review);
    });
  });
};

// update review
// /add_review_pictures - PUT
exports.addReviewPictures = (req, res) => {
  Review.find({authorID: req.body.userID}, (err, reviews) => {
    Review.update({_id: req.body.reviewID}, {
      $push: {pictures: req.body.pictures}
    }, (err, review) => {
      if (err) {
        res.send(err);
      }

      res.json(review);
    });
  });
};

// delete review
// /delete_review - PUT
exports.deleteReview = (req, res) => {
  Review.find({authorID: req.body.userID}, (err, review) => {
    Review.remove({_id: req.body.reviewID}, (err, review) => {
      if (err) {
        res.send(err);
      }

      res.json({message: "Review Successfully removed"});
    });
  });
};
