"use strict"; 

const path = require('path');

module.exports = (app, passport) => {
  // back end routes
  // ===========================================================================

  // login ---------------------------------------------------------------------
  // get
  app.get('/api/login', (req, res) => {
    res.json({message: "Welcome to the login!"});
  });

  // post
  app.post('/api/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard', // redirect to the dashboard page
    failureRedirect: '/'
  }));

  // signup
  // get
  app.get('/api/signup', (req, res) => {
    res.json({message: "Welcome to the signup page!"});
  });

  // post
  app.post('/api/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  }));

  // log out
  // ---------------------------------------------------------------------------
  app.get('/logout', (req, res) => {
    req.logOut();
    req.session.destroy(function() {
      res.redirect('/api/login');
    });
  });

  // front end routes
  // ===========================================================================
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/index.html"));
  });

  app.get('/dashboard', loggedIn, (req, res) => {
    //console.log(req);
    res.sendFile(path.join(__dirname, "../public/views/index.html"));
  })
};

function loggedIn(req, res, next) {
  // if authenticated
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}
