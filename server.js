// server.js

// modules
var bodyParser  = require('body-parser');
var dotenv      = require('dotenv');
var mongoose    = require('mongoose');
var express     = require('express');
var flash		= require('connect-flash');
var passport 	= require('passport');
var session 	= require('express-session');
var MongoStore 	= require('connect-mongo') (session);
var app         = express();

require('./server/config/passport') (passport);

// confiuration
dotenv.load();

// database configuration file
var db = require('./server/config/db');

// connect to mongoDB
mongoose.connect(db.url);

// port number
var port = process.env.PORT || 3000;

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// set location of static files
app.use(express.static(__dirname + '/client/public'));

app.use(session({
   collection: 'sessions',
   name: 'session',
   resave: false,
   saveUninitialized: true,
   secret: process.env.SESSION_SECRET,
   store: new MongoStore({ mongooseConnection: mongoose.connection }),
   ttl: 2*24*60*60, //2 day before expiration
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Configure view templating
app.set('views', __dirname + '/server/views/');
// Add jade as view engine
app.set('view engine', 'jade');

// routes
require('./server/routes') (app, express);

app.listen(port, function() {
    console.log('Listening on port ' + port);
});
