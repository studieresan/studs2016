var mongoose = require('mongoose');

var Resume = require('../models/Resume');

exports.findAll = function(req, res) {
	Resume.find({}).populate('user').exec(function (err, resumes) {
		return res.send(resumes);
	});
};

exports.findMine = function(req, res) {
	Resume.findOne({ student: req.user._id }, function(err, result) {
		return res.send(result);
	});
};

exports.update = function(req, res) {
	var resume;
	Resume.findOne({ student: req.user._id }, function(err, result) {
		resume = result;
	});
	resume.description = req.body.description;
	resume.posts = req.body.posts;
	resume.save(function(err) {
		if (err) {
			return console.log(err);
		}

		return res.json(resume);
	});
};
