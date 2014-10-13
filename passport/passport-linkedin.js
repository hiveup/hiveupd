// config/passport.js

var LinkedInStrategy = require('passport-linkedin').Strategy;
var User            = require('../../app/models/user');
var config = require('../../app/index').config;


module.exports = function(passport) {

  passport.use(new LinkedInStrategy({
      consumerKey: config.oauth.linkedin.consumerKey,
      consumerSecret: config.oauth.linkedin.consumerSecret,
      callbackURL: config.baseUrl+"/auth/linkedin/callback"
    },
    function(token, tokenSecret, profile, done) {
      console.log("token: ",token," secret: ", " profile", profile);
          // asynchronous verification, for effect...
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  ));


};
