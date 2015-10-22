var mongoose = require('mongoose');

require('../models/companyEvents');

CompanyEvents = mongoose.model('companyEvents');


//Get all users.
exports.findAll = function(req, res) {
	CompanyEvents.find({}, function(err, results) {
		return res.send(results);
	});
};

// Add a user.
exports.add = function(req, res) {
	var companyEvents = new CompanyEvents();
	companyEvents = req.body;

	companyEvents.save(function (err) {
		if (err) {
			return console.log(err);
		}
		return res.send(companyEvents);
	});
};

