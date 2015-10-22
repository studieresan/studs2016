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


    // User-api
    app.get('/users', users.findAll);
    app.post('/users', users.add);

    // Event-api
    app.get('/events', events.findAll);
    app.post('/events', events.add);
};
