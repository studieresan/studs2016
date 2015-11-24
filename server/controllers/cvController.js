var mongoose = require('mongoose');

var Cv = require('../models/Cv');

//Get all
exports.findAll = function(req, res) {
	Cv.find({}).populate('user').exec(function (err, cv) {
		console.log(cv);
	});
};

exports.findByUserId = function(req, res) {
	return req.send('Todo: Find by Id');
};

// Add a event.
exports.add = function(req, res) {
	var cv = new Cv({ 
		description: "Test",
		posts: [
		{
			"type": "Type test",
			"title": "Title test",
			"description": "Description test",
			"startdate": 0,
			"enddate": 100
		},
		{
			"type": "Type test2",
			"title": "Title test2",
			"description": "Description test2",
			"startdate": 2,
			"enddate": 102
		}]
	});
	cv.save(function(err) {
		console.log(err);
	});
};

