// server.js

// modules
var bodyParser  = require('body-parser');
var dotenv      = require('dotenv');
var mongoose    = require('mongoose');
var express     = require('express');
var app         = express();

// confiuration
dotenv.load();

// database configuration file
var db = require('./app/config/db');

// connect to mongoDB
mongoose.connect(db.url);

// port number
var port = process.env.PORT || 3000;

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// set location of static files
app.use(express.static(__dirname + '/public'));

// routes
require('./app/routes') (app);

app.listen(port, function() {
    console.log('Listening on port ' + port);
});
