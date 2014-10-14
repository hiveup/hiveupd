var User = require('../models/user.js');

module.exports = function(app, passport){

var express = require('express');
var router = express.Router();


var isAuthenticated = function(req, res, next) { //maybe not clean but works
    //if (req.user !== null)
    if (req.isAuthenticated())
        return next();
    res.status(401, ""); // TODO message d'erreur
    res.send();
};

/* GET users listing. */
app.get('/users/', function(req, res) {
    res.send('respond with a resource');
});


app.post('/users/signup', function(req, res) {
    passport.authenticate('local-signup', function (err, user, info) {
        if (err) {
            res.status(500);
            res.json({
                err: err
            });
            return;
        }
        if (user === false) {
            res.json({
                err: "E-mail already registered. Try another one."
            });
            return;
        }
        req.logIn(user, function(err) {
            if (err) {
                res.status(500);
                res.json({
                    err: err
                });
                return;
            }
            res.json(user);
            return;
        });
    })(req, res);
});

app.post('/users/login', passport.authenticate('local-login'), isAuthenticated, function(req, res) {
    // `req.user` contains the authenticated user.
    res.send(req.user); //changer avec du json plus propre !
});

app.post('/users/logout', function(req, res) {
  	req.logOut();
  	res.status(204); //No content
  	res.send();
});

app.get('/users/is_authenticated', isAuthenticated, function(req, res) {
    res.send(req.user);
});

app.post('/users/edit', isAuthenticated, function(req, res) {
    User.findOne({ '_id': req.user._id}, function(err, result) {
        if (err) {
            console.log('error edit on mongo');
            res.status(500);
            res.send();
        }
        if (result) {
            if (!req.body._id || !result._id.equals(req.body._id)) {
                console.log('error edit on ids');
                res.status(401);
                res.send();
            } else {
                if (req.body.local.password) {
                    req.body.local.password = result.generateHash(req.body.local.password);
                }
                for (var param in req.body.local) {
                    result.local[param] = req.body.local[param];
                }
                result.save(function(err) {
                    if (err) {
                        console.log('error edit in db', err);
                        res.json({
                            user: req.user,
                            err: (err.code === 11001 ? "This email address is already taken !" : "Something wrong happened !")
                        });
                        return;
                    }
                    res.json({
                        user: result
                    });
                });
            }
        }
    });
});



};
