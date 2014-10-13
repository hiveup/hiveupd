// config/passport.js

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../app/models/user');
var Account = require('../../app/models/account');
var config = require('../../app/index').config;


module.exports = function(passport) {

    passport.use(new GoogleStrategy({
        clientID: config.oauth.google.clientID,
        clientSecret: config.oauth.google.clientSecret,
        callbackURL: config.baseUrl+"/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {

        console.log(accessToken);

        data = {};
        data.googleId = profile.id;
        data.email = profile._json.email;
        data.token = accessToken;
        data.familyName = profile.name.familyName;
        data.givenName = profile.name.givenName;
        data.hasAccount = true;

        Account.addGoogle(data, function(error, body){
          console.log("account", body);
          // var accountId = 12;
          // User.add(data, function(error, body){
          //   console.log("User", body);
          // });
        });

        //return done(err, user);
      }
    ));

};
