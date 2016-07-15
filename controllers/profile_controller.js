const User = require('../models/user_model');

// Get Profile
// /get_profile - POST
exports.getProfile = function(req, res) {
  console.log(req);
  User.findOne({_id: req.session.passport.user}, function(err, user) {

    res.json(user);
  });
};

// Edit Profile
// /update_profile_details - PUT
exports.updateProfileDetails = function(req, res) {
  User.findOne({_id: req.session.passport.user}, function(err, user) {
    User.update({
      "location.zipcode": req.body.zip,
      "location.city": req.body.city,
      "profile.username": req.body.username,
      "profile.firstname": req.body.firstname,
      "profile.lastname": req.body.lastname
    }, function(err, user) {
      if (err) {
        res.send(err);
      }

      res.json(user);
    });
  });
};

// Edit Password

// Edit Fitness Levels
// /update_fitness_profile - PUT
exports.updateFitnessProfile = function(req, res) {
  User.findOne({_id: req.session.passport.user}, function(err, user) {
    User.update({
      "fitness.experience": req.body.experience,
      "fitness.level": req.body.level,
      "fitness.preference": req.body.preference
    }, function(err, user) {
      if (err) {
        res.send(err);
      }

      res.json(user);
    });
  });
};

// Edit Profile Picture
// /update_profile_picture - PUT
exports.updateProfilePicture = function(req, res) {
  User.findOne({_id: req.session.passport.user}, function(err, user) {
    User.update({
      "profile.picture": req.body.image
    }, function(err, user) {
      if (err) {
        res.send(err);
      }

      res.json(user);
    });
  });
};

// Add Bike
// /add_bike - PUT
exports.addBike = function(req, res) {
  User.findOne({_id: req.session.passport.user}, function(err, user) {
    User.update({
      $push: {bikes: {
        brand: req.body.brand,
        year: req.body.year,
        model: req.body.model,
        picture: req.body.image
      }}
    }, function(err, user) {
      if (err) {
        res.send(err);
      }

      res.json(user);
    });
  });
};

// Update Bike
// /update_bike - PUT
exports.updateBike = function(req, res) {
  console.log(req.body);
  User.findOne({_id: req.session.passport.user}, function(err, user) {
    User.update({bikes: {$elemMatch: {"_id": req.body.bikeID}}},
      {$set: {
        "bikes.$.brand": req.body.brand,
        "bikes.$.year": req.body.year,
        "bikes.$.model": req.body.model,
        "bikes.$.picture": req.body.image
    }}, function(err, user) {
      if (err) {
        res.send(err);
      }

      res.json(user);
    });
  });
};

// Delete Bike
// /delete_bike - PUT
exports.deleteBike = function(req, res) {
  User.findOne({_id: req.session.passport.user}, function(err, user) {
    User.update({}, {
      $pull: {bikes: {$elemMatch: {"bikes.$._id": req.body.bikeID}}}
    }, {

    },  function(err, user) {
        if (err) {
          res.send(err);
        }

        res.json({message: "Bike Successfully removed."});
      });
  });
};
