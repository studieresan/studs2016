var users = require('./controllers/userController');
var events = require('./controllers/eventController');
var passport = require('passport');

function isAdmin(user) {
    return user && user.email === "studs-it@d.kth.se"
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

module.exports = function(app) {
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
            ngApp: "about"
        });
    });

    // Trip
    app.get('/trip', function(req, res) {
        res.render('trip/index', {
            ngApp: "trip",
        });
    });

    // Contact
    app.get('/contact', function(req, res) {
        res.render('contact/index', {
        });
    });

    // Login
    app.get('/login*', function(req, res) {
        res.render('auth/index', {
            ngApp: "auth"
        });
    });

    // User-api
    app.get('/api/users', ensureAdmin, users.findAll);
    app.post('/api/users', ensureAdmin, users.add);
    app.post('/api/corporations', ensureEventGroup, users.addCorporation);
    app.post('/api/students', ensureAdmin, users.addStudent);

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash : true
    }));
    app.get('/logout', users.signout);

    // Event-api
    app.get('/api/events', events.findAll);
    app.get('/api/events/:slug', events.findBySlug);
    app.post('/api/events', events.add);
};
