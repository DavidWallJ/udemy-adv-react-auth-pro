/**
 * Created by david on 6/23/17.
 */
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// session: false indicates we don't want to use cookies
// requireAuth is the middleware between and incoming request and the route handler
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  // any user coming in at '/' first has to go through requireAuth before being passed on to the next function
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });
  app.post('/signup', Authentication.signup);
}
