/**
 * Created by david on 6/24/17.
 */
// using passport to answer if the user is signed in
  // using a JWT or using a username/password
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// create local strategy
// when the user first access the site they won't have a 'token' we'll need to authenticate with password and email
// LocalStrategy by default accepts a 'usernameField' from the request body but we want 'email'
// password is already default
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  // verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    // no error but no identical email address found
    if (!user) { return done(null, false); }

    // compare passwords but first we have to decrypt the password stored in the db
  });
});

// setup options for JWT strategy
// tell the JwtStrategy where to look for jwt
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// create JWT strategy
// when ever a request is made with a jwt then the callback below will be run
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // see if the user ID in the payload exists in our database
  // if it does, call done with that user
  // otherwise, call done without a user object
  // payload.sub was setup in authentication
  User.findById(payload.sub, function (err, user) {
    // second argument should be the user
    if (err) { return done(err, false); }

    if (user) {
      // no err send user
      done(null, user);
    } else {
      // no err or user
      (null, false)
    }
  });
});

// tell passport to use this strategy
passport.use(jwtLogin);
