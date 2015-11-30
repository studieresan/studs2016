var mongoose = require('mongoose');

var Resume = require('../models/Resume');

exports.findAll = function(req, res) {
	Resume.find({}).populate('user').exec(function (err, resumes) {
		return res.send(resumes);
	});
};

exports.findMine = function(req, res) {
	Resume.findOne({ _id: req.user._id }, function(err, result) {
		return res.send(result);
	});
};

/*
exports.add = function(req, res) {
	resume = new Resume(req.body);
	resume.user = "565b3e6fddecec95564ee97c";
	resume.save(function (err) {
		if (err) {
			return console.log(err);
		}
		return res.json(resume);
	});
};
*/
