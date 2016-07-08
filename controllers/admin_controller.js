const User = require('../models/user_model');

// ADMIN USER CONTROLLERS

// GET - /get_users
exports.getAllUsers = function(req, res) {
  User.find().then(function(err, user) {

    res.json(user);
  });
};

// POST - /create_user
exports.createUser = function(req, res) {

  // create new user
  const user = new User();

  user.creds.email = req.body.email;
  user.creds.author = req.body.author;
  user.creds.admin = req.body.admin;

  user.save(function(err, user) {
    if (err) {
      res.send(err);
    }

    res.json({message: "User created succcessfully."});
  });
};

// PUT - /update_user
exports.updateUser = function(req, res) {

  User.find(function(err, user) {
    User.update({_id: req.session.passport.user}, {
      creds.password: req.body.password,
      creds.author: req.body.author,
      creds.admin: req.body.admin,
      location.zipcode: req.body.zipcode,
      location.city: req.body.city,
      profile.username: req.body.username,
      profile.firstname: req.body.firstname,
      profile.lastname: req.body.lastname
    }, function(err, user) {
      if (err) {
        res.send(err);
      }

      res.json({message: "User updated"});
    });
  });
};
