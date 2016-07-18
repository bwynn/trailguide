const trailCtrl = require('../controllers/trail_controller');

module.exports = function(app, passport) {

  // get trails
  app.get('/get_all_trails', trailCtrl.getAllTrails); // √

  // get trail
  app.post('/get_trail', trailCtrl.getTrail); // √

  // add trail
  app.post('/add_trail', trailCtrl.addTrail); // √

  // update trail
  app.put('/update_trail', trailCtrl.updateTrail);

  // add featured image
  app.put('/add_featured_image', trailCtrl.addFeaturedImage);

  // remove trail
  app.put('/remove_trail', trailCtrl.removeTrail);
};

function loggedIn(req, res, next) {
  // if authenticated
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}
