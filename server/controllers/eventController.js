CompanyEvents = require('../models/companyEvents');

// Find all events
exports.findAll = function(req, res) {
	CompanyEvents.find({}, function(err, results) {
		//console.log(results);
		return res.send(results);
	});
};

// Find an event by its id
exports.findById = function(req, res) {
	var id = req.params.id;
	CompanyEvents.findOne({'_id':id}, function(err, result) {
		return res.send(result);
	});
};

// Find an event by its slug
exports.findBySlug = function(req, res) {
	var slug = req.params.slug;
	CompanyEvents.findOne({'slug':slug}, function(err, result) {
		return res.send(result);
	});
};

// Add an event
exports.add = function(req, res) {
	var companyEvents = new CompanyEvents(req.body);

	companyEvents.save(function (err) {
		if (err) {
			console.log(err);
			return res.send('error: ' + err);
		}
		return res.json(companyEvents);
	});
};
