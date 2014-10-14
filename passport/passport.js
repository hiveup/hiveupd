var User = require('../../app/models/user');

module.exports = function(passport) {

    // passport session setup
    // ========================
    // serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log("serializeUser : " + user.id);
        done(null, user.id);
    });

    // deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

};
