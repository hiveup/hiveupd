module.exports = function(app){

var express = require('express');

/* GET something. */
app.get('/cool_routes/', function(req, res) {
    res.send('respond with a resource');
});

};
