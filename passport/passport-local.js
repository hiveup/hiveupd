// config/passport.js

var LocalStrategy   = require('passport-local').Strategy;
var User       		= require('../models/user');


module.exports = function(passport) {

    // LOCAL SIGNUP
    // ==============

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        console.log("function passport signup called with "+ email + " " + password);
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
            console.log("process.nextTick");

		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err){
                console.log("error mongoose");
                return done(err);
            }

            if (user) { //email already taken
                console.log("email already taken");
                return done(null, false);
            } else {
                console.log("email ok");

                var newUser  = new User();

                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.local.username = email.replace(/@.*/, '');
                newUser.local.name = 'User' + newUser._id;

                newUser.save(function(err) {
                    if (err)
                        throw err;

                    console.log("user saved");
                    return done(null, newUser);
                });
            }

        });

        });

    }));

    // LOCAL LOGIN
    // ============

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        console.log("function passport login called with "+ email + " " + password);


        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err) {
                console.log("Mongoose error");
                return done(err);
            }
            if (!user) {// no user found
                console.log("bad email");
                return done(null, false);
            }

            if (!user.validPassword(password)) { // bad password
                console.log("bad password");
                return done(null, false);
            }

            return done(null, user);
        });

    }));

};
