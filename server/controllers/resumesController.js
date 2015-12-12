var mongoose = require('mongoose');

var Resume = require('../models/Resume');

// find all resumes
exports.findAll = function(req, res) {
	Resume.find({}).populate('student').exec(function (err, resumes) {
		return res.send(resumes);
	});
};

// find the authenticated student's resume
exports.findByStudentId = function(req, res) {
	Resume.findOne({ student: req.params.id }).populate('student').exec(function(err, resume) {
		return res.send(resume);
	});
};


// find the authenticated student's resume
exports.findMine = function(req, res) {
	Resume.findOne({ student: req.user._id }).populate('student').exec(function(err, resume) {
		return res.send(resume);
	});
};

// update the authenticated student's resume
exports.update = function(req, res) {
	Resume.findOne({ student: req.user._id }, function(err, result) {
		var resume = result;
		resume.description = req.body.description;
		resume.posts = req.body.posts;
		resume.save(function(err) {
			return res.send(resume);
		});
	});
};
