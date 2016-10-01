"use strict";

const User = require('../models/user_model');

// Get Profile
// /get_profile - POST
exports.getProfile = (req, res) => {
  User.findOne({_id: req.session.passport.user}, (err, user) => {

    res.json(user);
  });
};

// Get User
// /get_user - POST
exports.getUser = (req, res) => {
  User.findOne({_id: req.body.id}, (err, user) => {
      if (err) {
        res.send(err);
      }

      res.json(user);
  });
};

// Get All Users
// /get_all_users - GET
exports.getAllUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.send(err);
    }

    res.json(users);
  });
};

// Edit Profile
// /update_profile_details - PUT
exports.updateProfileDetails = (req, res) => {

  /*const coords = [],
        sentCoordinates = req.body.coords;

  for (var i = 0; i < sentCoordinates.length; i++) {
    var location = parseFloat(sentCoordinates[i]);
    coords.push(location);
  }*/

  User.findOneAndUpdate({_id: req.session.passport.user},{
    "location.zipcode": req.body.zipcode,
    "location.city": req.body.city,
    "profile.username": req.body.username,
    "profile.firstname": req.body.firstname,
    "profile.lastname": req.body.lastname
    //"location.coords": req.body.coords
  }, (err, user) => {
    if (err) {
      res.send(err);
    }

    res.json(user);
  });
};

// Edit Password

// Edit Fitness Levels
// /update_fitness_profile - PUT
exports.updateFitnessProfile = (req, res) => {
  User.findOne({_id: req.session.passport.user}, (err, user) => {
    User.update({
      "fitness.fitnessLevel": req.body.fitnessLevel,
      "fitness.skillLevel": req.body.skillLevel,
      "fitness.preference": req.body.preference
    }, (err, user) => {
      if (err) {
        res.send(err);
      }

      res.json(user);
    });
  });
};

// Edit Profile Picture
// /update_profile_picture - PUT
exports.updateProfilePicture = (req, res) => {
  console.log(req.body);
  console.log(req.session);
  console.log(req.session.passport.user);
  User.findOne({_id: req.session.passport.user}, (err, user) => {
    User.update({_id: req.body.id}, {
      "profile.picture": req.body.image
    }, (err, user) => {
      if (err) {
        res.send(err);
      }

      res.json(user);
    });
  });
};

// Add Bike
// /add_bike - PUT
exports.addBike = (req, res) => {
  User.findOne({_id: req.session.passport.user}, (err, user) => {
    User.update({
      $push: {bikes: {
        brand: req.body.brand,
        year: req.body.year,
        model: req.body.model,
        picture: req.body.image
      }}
    }, (err, user) => {
      if (err) {
        res.send(err);
      }

      res.json(user);
    });
  });
};

// Update Bike
// /update_bike - PUT
exports.updateBike = (req, res) => {
  console.log(req.body);
  User.findOne({_id: req.session.passport.user}, (err, user) => {
    User.update({bikes: {$elemMatch: {"_id": req.body.bikeID}}},
      {$set: {
        "bikes.$.brand": req.body.brand,
        "bikes.$.year": req.body.year,
        "bikes.$.model": req.body.model,
        "bikes.$.picture": req.body.image
    }}, (err, user) => {
      if (err) {
        res.send(err);
      }

      res.json(user);
    });
  });
};

// Delete Bike
// /delete_bike - PUT
exports.deleteBike = (req, res) => {
  User.findOne({_id: req.session.passport.user}, (err, user) => {
    User.update({}, {
      $pull: {bikes: {$elemMatch: {"bikes.$._id": req.body.bikeID}}}
    }, {

    }, (err, user) => {
        if (err) {
          res.send(err);
        }

        res.json({message: "Bike Successfully removed."});
      });
  });
};
