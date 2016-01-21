/*
|------------------------------------------------------------------------------
| Server modules
|------------------------------------------------------------------------------
*/

var bodyParser  = require('body-parser');
var dotenv      = require('dotenv');
var mongoose    = require('mongoose');
var express     = require('express');
var flash       = require('connect-flash');
var passport    = require('passport');
var session     = require('express-session');
var MongoStore  = require('connect-mongo') (session);



/*
|------------------------------------------------------------------------------
| Server configuration
|------------------------------------------------------------------------------
*/

// dotenv
dotenv.load();

// passport
require('./server/config/passport') (passport);

// databse
var db = require('./server/config/db');

// server port number
var port = process.env.PORT || 3000;

// connect to mongoDB
mongoose.connect(db.url);

/*
|------------------------------------------------------------------------------
| Application setup
|------------------------------------------------------------------------------
*/

// create application
var app = express();

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// set location of static files
app.use(express.static(__dirname + '/client/public'));

// session setup
app.use(session({
	collection: 'sessions',
	name: 'session',
	resave: false,
	saveUninitialized: true,
	secret: process.env.SESSION_SECRET,
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	ttl: 2*24*60*60, // 2 day before expiration
}));

// passport setup
app.use(passport.initialize());

// passport session
app.use(passport.session());

// flash messaging
app.use(flash());

// view template setup
app.set('views', __dirname + '/server/views/');

// view engine setup
app.set('view engine', 'jade');

// routing
require('./server/routes') (app, express);

// start server
app.listen(port, function() {
	console.log('Listening on port ' + port);
});
