"use strict";

const Trail = require('../models/trail_model'),
      User = require('../models/user_model');

// query by keyword
// /find_by_keyword - POST
exports.findByKeyword = (req, res) => {
  Trail.find({keywords: {$in: [req.body.keywords]}}, (err, trails) => {
    if (err) {
      res.send(err);
    }

    res.json(trails);
  });
};

// query by fitness level
// /find_by_fitness - POST
exports.findByFitness = (req, res) => {
  Trail.find({"profile.fitnessLevel": {'$lte' : req.body.fitnessLevel}}, (err, trail) => {
    if (err) {
      res.send(err);
    }

    res.json(trail);
  });
};

// query by distance
// /find_by_distance - POST
exports.findByDistance = (req, res) => {
  const lat = req.body.lat,
        long = req.body.long,
        distance = req.body.distance;

  const query = Trail.find({});

    if (distance) {
      query.where('location').near(
        {center:
          {type: 'Point', coordinates: [long, lat]},

          // convert meters to miles
          maxDistance: distance * 1609.34,
          spherical: true
      });
    }

    query.exec((err, trail) => {
      if (err) {
        res.send(err);
      }

      res.json(trail);
    }, (rejected) => {
      res.json(rejected);
    });
};

// query by skill level
// /find_by_skill - POST
exports.findBySkill = (req, res) => {
  Trail.find({"profile.skillLevel": {'$lte': req.body.skillLevel}}, (err, trail) => {
    if (err) {
      res.send(err);
    }

    res.json(trail);
  });
};

// query by title
// /find_by_title - POST
exports.findByTitle = (req, res) => {
  Trail.find({title: req.body.title}, (err, trail) => {
    if (err) {
      res.send(err);
    }

    res.json(trail);
  });
};
