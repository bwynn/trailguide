const path = require('path');

module.exports = function(app) {
// back end routes
// =============================================================================
  const adminCtrl = require('../controllers/admin_controller');
  // find users - GET
  app.get('/api/find_users', adminCtrl.getAllUsers);

  // create user - POST
  app.post('/api/create_user', adminCtrl.createUser);

  // update user - PUT
  app.put('api/update_user', adminCtrl.updateUser);
};
