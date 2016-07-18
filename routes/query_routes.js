const queryCtrl = require('../controllers/query_controller');

module.exports = function(app) {
  // query by keyword
  app.post('/find_by_keyword', queryCtrl.findByKeyword);

  // query by fitness level
  app.post('/find_by_fitness', queryCtrl.findByFitness);

  // query by skill level
  app.post('/find_by_skill', queryCtrl.findBySkill);

  // query by distance
  app.post('/find_by_distance', queryCtrl.findByDistance);

  // query by title
  app.post('/find_by_title', queryCtrl.findByTitle);
};
