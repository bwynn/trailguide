const Trail = require('../models/trail_model');

// get all trails
// /get_all_trails - GET
exports.getAllTrails = function(req, res) {
    Trail.find().then(function(trails) {

      res.json(trails);
    });
};

// get trail
// /get_trail - GET
exports.getTrail = function(req, res) {
    Trail.findOne({_id: req.body.id}, function(err, trail) {
      if (err) {
        res.send(err);
      }

      res.json(trail);
    });
};

// add trail
// /add_trail - POST
exports.addTrail = function(req, res) {
    const trail = new Trail();

    trail.coords.lat = req.body.lat;
    trail.coords.lng = req.body.lng;
    trail.keywords = req.body.keywords;
    trail.profile.description = req.body.description;
    trail.profile.fitnessLevel = req.body.fitnessLevel;
    trail.profile.skillLevel = req.body.skillLevel;
    trail.profile.access = req.body.access;
    trail.title = req.body.title;

    trail.save(function(err, trail) {
      if (err) {
        res.send(err);
      }

      res.json(trail);
    });
};

// edit trail
// /update_trail - PUT
exports.updateTrail = function(req, res) {

  console.log(req.body);
    Trail.findOne({_id: req.body.id}, function(err, trail) {
      Trail.update({
        "trail.coords.lat": req.body.lat,
        "trail.coords.lng": req.body.lng,
        "trail.profile.description": req.body.description,
        "trail.profile.fitnessLevel": req.body.fitnessLevel,
        "trail.profile.skillLevel": req.body.skillLevel,
        "trail.profile.access": req.body.access,
        "trail.title": req.body.title,
        "trail.featuredImg": req.body.featuredImg
      }, function(err, trail) {
        if (err) {
          res.send(err);
        }

        res.json(trail);
      });
    });
};

// add featured image

// remove trail

// set featured image
// add keywords
