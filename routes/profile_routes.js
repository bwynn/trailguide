const profileCtrl = require('../controllers/profile_controller');

module.exports = function(app, passport) {
  // profile routes
  // ===========================================================================

  // get profile
  app.post('/get_profile', profileCtrl.getProfile); // √

  // update profile details
  app.put('/update_profile_details', loggedIn, profileCtrl.updateProfileDetails); // √

  // update fitness preferences
  app.put('/update_fitness_profile', loggedIn, profileCtrl.updateFitnessProfile); // √

  // update profile picture
  app.put('/update_profile_picture', loggedIn, profileCtrl.updateProfilePicture); // √

  // add bike
  app.put('/add_bike', loggedIn, profileCtrl.addBike); // √

  // update bike
  app.put('/update_bike', loggedIn, profileCtrl.updateBike); // √

  // delete bike
  app.put('/delete_bike', loggedIn, profileCtrl.deleteBike);

  // get user
  app.post('/get_user', profileCtrl.getUser);

  // get all users
  app.get('/get_all_users', profileCtrl.getAllUsers);
};

function loggedIn(req, res, next) {
  // if authenticated
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}
