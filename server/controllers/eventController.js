var mongoose = require('mongoose');

CompanyEvents = require('../models/companyEvents');


//Get all events.
exports.findAll = function(req, res) {
	CompanyEvents.find({}, function(err, results) {
		//console.log(results);
		return res.send(results);
	});
};

exports.findById = function(req, res) {
   var id = req.params.id;
   CompanyEvents.findOne({'_id':id}, function(err, result) {
       return res.send(result);
   });
};

//Find by slug
exports.findBySlug = function(req, res) {
   var slug = req.params.slug;
   CompanyEvents.findOne({'slug':slug}, function(err, result) {
       return res.send(result);
   });
};


// Add a event.
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

