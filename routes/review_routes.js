const reviewCtrl = require('../controllers/review_controller');

module.exports = function(app, passport) {

  // get all reviews
  app.get('/get_reviews', reviewCtrl.getReviews);

  // get review by author
  app.post('/get_review_author', reviewCtrl.getReviewByAuthor);

  // get review by trail
  app.post('/get_review_trail', reviewCtrl.getReviewByTrail);

  // get review by id
  app.post('/get_review', reviewCtrl.getReviewByID);

  // add review
  app.post('/add_review', loggedIn, reviewCtrl.addReview);

  // update review
  app.put('/update_review', loggedIn, reviewCtrl.updateReview);

  // delete review
  app.put('/delete_review', loggedIn, reviewCtrl.deleteReview);
};

function loggedIn(req, res, next) {
  // if authenticated
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}
