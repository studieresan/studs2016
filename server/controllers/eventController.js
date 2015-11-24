CompanyEvents = require('../models/companyEvents');

// Find all events
exports.findAll = function(req, res) {
	CompanyEvents.find({}, function(err, results) {
		return res.send(results);
	});
};

// Find an event by its id
exports.findById = function(req, res) {
	CompanyEvents.findOne({ _id: req.params.id }, function(err, result) {
		return res.send(result);
	});
};

// Find an event by its slug
exports.findBySlug = function(req, res) {
	CompanyEvents.findOne({ slug: req.params.slug }, function(err, result) {
		return res.send(result);
	});
};

// Add an event
exports.add = function(req, res) {
	var companyEvents = new CompanyEvents(req.body);

	companyEvents.save(function (err) {
		if(err) {
			return res.send(err);
		}
		return res.json(companyEvents);
	});
};

// Updated an existing event
exports.update = function(req, res) {
	CompanyEvents.findById(req.params.id, function(err, companyEvent) {

		if (!companyEvent) {
			return res.sendStatus(404);
		}

		companyEvent.title       = req.body.title;
		companyEvent.company     = req.body.company;
		companyEvent.date        = req.body.date;
		companyEvent.location    = req.body.location;
		companyEvent.description = req.body.description;

		companyEvent.save(function(err) {
			res.json(companyEvent);
		});
	});
};

// Remove an event by its id
exports.remove = function(req, res) {
	CompanyEvents.remove({ _id: req.params.id }, function(err) {
		if (err) return next(err);
	});
};
