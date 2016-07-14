const LocalStrategy = require('passport-local').Strategy,
      User = require('../models/user_model');

module.exports = function(passport) {

  // serialize user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // sign up
  // ===========================================================================

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // pass request back to callback
  }, function(req, email, password, done) {

    // async set up
    process.nextTick(function() {

      // find user by email
      User.findOne({'creds.email': email}, function(err, user) {
        if (err) {
          done(err);
        }

        if (user) {
          return done(null, false, req.flash('signupMessage', 'Sorry, email is already in use.'));
        }
        else {
          // email has not been used
          const newUser = new User();

          newUser.creds.email = email;
          newUser.creds.password = newUser.generateHash(password);
          newUser.creds.author = false;
          newUser.creds.admin = false;

          newUser.save(function(err) {
            if (err) {
              throw err;
            }

            return done(null, newUser);
          });
        }
      });
    });
  }));

  // log in
  // ===========================================================================

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done) {

    User.findOne({'creds.email': email}, function(err, user) {
      if (err) {
        res.send(err);
      }

      if (!user) {
        return done(null, false, req.flash('login-message', 'No User Found.'));
      }

      if (!user.validPassword(password)) {
        return done(null, false, req.flash('login-message', 'Oops! Wrong password.'));
      }

      return done(null, user);
    });
  }));
};
