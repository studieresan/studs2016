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
};
