const Trail = require('../models/trail_model'),
      Review = require('../models/review_model');

// get all trails
// /get_all_trails - GET
exports.getAllTrails = function(req, res) {
    Trail.find().then(function(trails) {

      res.json(trails);
    });
};

// get trail
// /get_trail - POST
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
    Trail.find({title: req.body.title}, function(err, trail) {
      Trail.update({_id: req.body.id}, {
        "coords.lat": req.body.lat,
        "coords.lng": req.body.lng,
        "profile.description": req.body.description,
        "profile.fitnessLevel": req.body.fitnessLevel,
        "profile.skillLevel": req.body.skillLevel,
        "profile.access": req.body.access,
        "title": req.body.title,
        "featuredImg": req.body.featuredImg
      }, function(err, trail) {
        if (err) {
          res.send(err);
        }

        res.json(trail);
      });
    });
};

// add featured image
// /add_featured_image - PUT
exports.addFeaturedImage = function(req, res) {
    Trail.find({title: req.body.title}, function(err, trail) {
      Trail.update({_id: req.body.id}, {
        "featuredImg": req.body.featuredImg
      }, function(err, trail) {
        if (err) {
          res.send(err);
        }

        res.json(trail);
      });
    });
};

// remove trail
// /remove_trail - PUT
exports.removeTrail = function(req, res) {
  Trail.find({title: req.body.title}, function(err, trail) {
    Trail.remove({_id: req.body.id}, function(err, trail) {
      if (err) {
        res.send(err);
      }

      res.json({message: "Trail successfully removed."});
    });
  });
};

// add keywords
// /add_keywords - PUT
exports.addKeywords = function(req, res) {
  Trail.update({_id: req.body.id}, {
    $push: {
      keywords: req.body.keywords
    }
  }, function(err, trail) {
    if (err) {
      res.send(err);
    }

    res.json(trail);
  });
};

// add rating - this route should be called subsequently of /add_review route,
// intended to push the req.body.rating value or var into defined trail.
exports.addTrailRating = function(req, res) {
  Trail.update({_id: req.body.trailID}, {
    $push: {rating: req.body.rating}
  }, function(err, trail) {
    if (err) {
      res.send(err);
    }

    res.json(trail);
  });
};
