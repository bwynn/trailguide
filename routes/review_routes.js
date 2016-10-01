"use strict";

const reviewCtrl = require('../controllers/review_controller');

module.exports = (app, passport) => {

  // get all reviews
  app.get('/get_reviews', reviewCtrl.getReviews);

  // get review by author
  app.post('/get_review_author', reviewCtrl.getReviewsByAuthor);

  // get review by trail
  app.post('/get_review_trail', reviewCtrl.getReviewsByTrail);

  // get review by id
  app.post('/get_review', reviewCtrl.getReviewByID);

  // add review
  app.post('/add_review', loggedIn, reviewCtrl.addReview);

  // update review
  app.put('/update_review', loggedIn, reviewCtrl.updateReview);

  // delete review
  app.put('/delete_review', loggedIn, reviewCtrl.deleteReview);

  // add review pictures
  app.put('/add_review_pictures', loggedIn, reviewCtrl.addReviewPictures);
};

function loggedIn(req, res, next) {
  // if authenticated
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}
