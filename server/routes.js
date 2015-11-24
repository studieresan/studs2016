var users = require('./controllers/userController');
var events = require('./controllers/eventController');
var passport = require('passport');

function isAdmin(user) {
    return user && user.email === "studs-it@d.kth.se";
}

function ensureEventGroup(req, res, next) {
    if( req.isAuthenticated() && (isAdmin(req.user) || (req.user && req.user.group === "event"))) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function ensureAdmin(req, res, next) {
    if(isAdmin(req.user) && req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(401);
    }
}

module.exports = function(app, express) {

    app.get('/posts', function(req, res) {
        Post.find(function(err, posts) {
            if (err)
                res.send(err);

            res.json(posts);
        });
    });

    // Get
    app.get('/', function(req, res) {
        res.render('index', { title: "Studs!" });
    });

    // Need to add wildcard in order to use HTML5
    // nice routes without hashbang
    app.get('/events*', function(req, res) {
        res.render('events/index', {
            // Angular variables
            ngApp: "events",
            // Layout variables
            fixedMenu: true
        });
    });

    // About
    app.get('/about', function(req, res) {
        res.render('about/index', {
            ngApp: "about",
            fixedMenu: true
        });
    });

    // Trip
    app.get('/trip', function(req, res) {
        res.render('trip/index', {
            ngApp: "trip",
            fixedMenu: true
        });
    });

    // Contact
    app.get('/contact', function(req, res) {
        res.render('contact/index', {
            fixedMenu: true
        });
    });

    // Login
    app.get('/login*', function(req, res) {
        res.render('auth/index', {
            ngApp: "auth"
        });
    });

    /*
    * Auth. functionality
    */
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash : true
    }));
    app.get('/logout', users.signout);

    /*
    *   A specific router is used for the api in order to prefix the endpoints
    */
    var api = express.Router();
    // User-api
    api.get('/users', ensureAdmin, users.findAll);
    api.post('/users', ensureAdmin, users.add);
    api.post('/corporations', ensureEventGroup, users.addCorporation);
    api.post('/students', ensureAdmin, users.addStudent);

    // Event-api
    api.get('/events', events.findAll);
    api.get('/events/:slug', events.findBySlug);
    api.post('/events', events.add);

    // Assign the api router to the app
    app.use("/api", api);
};
