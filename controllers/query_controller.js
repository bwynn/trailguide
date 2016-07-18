const Trail = require('../models/trail_model'),
      User = require('../models/user_model');

// query by keyword
// /find_by_keyword - POST
exports.findByKeyword = function(req, res) {
  Trail.find({}, {keywords: {$in: [req.body.keywords]}}, function(err, trails) {
    if (err) {
      res.send(err);
    }

    res.json(trails);
  });
};

// query by fitness level
// /find_by_fitness - POST
exports.findByFitness = function(req, res) {
  Trail.find({"profile.fitnessLevel": req.body.fitnessLevel}, function(err, trail) {
    if (err) {
      res.send(err);
    }

    res.json(trail);
  });
};

// query by distance
// /find_by_distance - POST
exports.findByDistance = function(req, res) {
  // TBD with Google Maps build
};

// query by skill level
// /find_by_skill - POST
exports.findBySkill = function(req, res) {
  Trail.find({"profile.skillLevel": req.body.skillLevel}, function(err, trail) {
    if (err) {
      res.send(err);
    }

    res.json(trail);
  });
};

// query by title
// /find_by_title - POST
exports.findByTitle = function(req, res) {
  Trail.find({title: req.body.title}, function(err, trail) {
    if (err) {
      res.send(err);
    }

    res.json(trail);
  });
};
