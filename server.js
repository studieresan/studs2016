// server.js

// modules
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var express     = require('express');
var app         = express();

// confiuration
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// routes
require('./app/routes') (app);

app.listen(port, function() {
    console.log('Listening on port ' + port);
});
