
var User = require('../models/user.js');

module.exports = function(app, passport){

var express = require('express');
var router = express.Router();


app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                            'https://www.googleapis.com/auth/userinfo.email'] }),
  function(req, res){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
  });

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.sendfile(__dirname + '/oauth_popup.html');
  });

app.get('/auth/linkedin',
  passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }));

app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

};
