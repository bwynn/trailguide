const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      morgan = require('morgan');

// config
// =============================================================================
const db = require('./config/db'),
      port = process.env.PORT || 3000;

const options = {
  server: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000
    }
  }
};

// connect to db
mongoose.connect(db.db);

// set up mongoose connection for filestack
const newConnect = mongoose.connection;

newConnect.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

// set static files path
app.use(express.static(__dirname + '/public'));

// routes
// =============================================================================
require('./routes/app_routes')(app);

// server
// =============================================================================
app.listen(port);

console.log("Connected on " + port);

exports = module.exports = app;
