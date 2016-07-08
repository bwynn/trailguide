const path = require('path');

module.exports = function(app) {
// back end routes
// =============================================================================

// front end routes
// =============================================================================
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/index.html"));
  });
};
