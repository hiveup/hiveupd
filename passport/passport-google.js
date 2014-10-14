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

        console.log("Google access token : ", accessToken);

        user = {};
        user.googleId = profile.id;
        user.email = profile._json.email;
        user.token = accessToken;
        user.familyName = profile.name.familyName;
        user.givenName = profile.name.givenName;
        user.hasAccount = true;

        Account.addGoogle(user, function(error, body){
          var accountId = body.results[0].data[0].row[0];
          console.log("accountId : ", accountId);
          User.add(user, function(error, body){
            var userId = body.results[0].data[0].row[0];
            console.log("userId : ", userId);

            user.id = userId
            done(null, user);

            Account.linkWithUser(accountId, userId, function(error, body){
              return;
            });
          });
        });

      }
    ));

};
