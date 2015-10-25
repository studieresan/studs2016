var users = require('./controllers/userController');
var events = require('./controllers/eventController');
var Post = require('./models/post');

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


    // User-api
    app.get('/api/users', users.findAll);
    app.post('/api/users', users.add);

    // Event-api
   app.get('/api/events', events.findAll);
   app.get('/api/events/:slug', events.findBySlug);
   app.post('/api/events', events.add);
};
