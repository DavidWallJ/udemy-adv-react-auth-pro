/**
 * Created by david on 6/24/17.
 */
const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user')

function tokenForUser(user) {
  // jwt objects have a sub property
  // we use user id here because it's some account info that should never change
  // iat = issued at time
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({error: 'You must provide an email and a password'});
  }

   // see if a user with the given email exists
  User.findOne({email: email}, function (err, existingUser) {
    // if the search fails not due to the content of the search
      if (err) { return next(err); }

      // if a user with email does exist, return an error
      if (existingUser) {
        return res.status(422).send({ error: 'Email is in use'});
      }

      // if a user does not exist, create and save user record
      const user = new User({
        email: email,
        password: password
      });

      user.save(function(err) {
        if (err) { return next(err); }
        res.json({ token: tokenForUser(user) });
      });
      // respond to request indicating the user was created


  });



}
