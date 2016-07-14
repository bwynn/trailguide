const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      passport = require('passport'),
      flash = require('connect-flash'),
      session = require('express-session');

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

// add passport config
require('./config/passport')(passport);

// set up mongoose connection for filestack
const newConnect = mongoose.connection;

newConnect.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// log all req/res to console
app.use(morgan('dev'));

// set static files path
app.use(express.static(__dirname + '/public'));

// authentication setup
app.use(session({secret: 'r1deB*k3'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
// =============================================================================
require('./routes/admin_routes')(app, passport);
require('./routes/profile_routes')(app, passport);
require('./routes/app_routes')(app, passport);

// server
// =============================================================================
app.listen(port);

console.log("Connected on " + port);

exports = module.exports = app;
