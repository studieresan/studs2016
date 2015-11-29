Event = require('../models/Event');

// find all events
exports.findAll = function(req, res) {
	Event.find({}, function(err, results) {
		return res.send(results);
	});
};

// find an event by its id
exports.findById = function(req, res) {
	Event.findOne({ _id: req.params.id }, function(err, result) {
		return res.send(result);
	});
};

// find an event by its slug
exports.findBySlug = function(req, res) {
	Event.findOne({ slug: req.params.slug }, function(err, result) {
		return res.send(result);
	});
};

// add an event
exports.add = function(req, res) {
	// underscore because 'event' is a reserved global variable
	var _event = new Event(req.body);

	_event.save(function (err) {
		if(err) {
			return res.send(err);
		}
		return res.json(_event);
	});
};

// updated an existing event
exports.update = function(req, res) {
	Event.findById(req.params.id, function(err, res) {

		if (!res) {
			return res.sendStatus(404);
		}

		res.title       = req.body.title;
		res.company     = req.body.company;
		res.date        = req.body.date;
		res.location    = req.body.location;
		res.description = req.body.description;

		res.save(function(err) {
			res.json(res);
		});
	});
};

// remove an event by its id
exports.remove = function(req, res) {
	Event.remove({ _id: req.params.id }, function(err) {
		if (err) {
			return next(err);
		}
	});
};
