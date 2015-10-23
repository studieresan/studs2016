var mongoose = require('mongoose');

CompanyEvents = require('../models/companyEvents');


//Get all users.
exports.findAll = function(req, res) {
	CompanyEvents.find({}, function(err, results) {
		console.log(results);
		return res.send(results);
	});
};

exports.findById = function(req, res) {
    var id = req.params.id;
    Item.findOne({'_id':id}, function(err, result) {
        return res.send(result);
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

