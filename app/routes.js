module.exports = function(app) {
    app.get('/', function(req, res) {
        res.json({ message: 'Studs2016' });
    });
};
