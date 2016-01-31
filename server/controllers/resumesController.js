var mongoose = require('mongoose');

var util     = require('util');					// TODO:
var exec     = require('child_process').exec;   // Extract to
var child;										// external service

var zip = require('express-zip');
var fs = require('fs');

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

// generate a resumé in PDF format
// TODO: Extract to external service
exports.generate = function(req, res) {
	var host = req.protocol + '://' + req.get('host');
	var input = host + '/resume/'+req.params.id;
	var output = 'resumes/'+req.params.id+'.pdf';
	child = exec('wkhtmltopdf '+input+' '+output,
 	function (error, stdout, stderr) {
    	console.log('stdout: ' + stdout);
    	console.log('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	});

	child.on('exit', function () {
		res.sendfile(output);
	});
};

exports.downloadAll = function(req, res) {

	var zip = [];

	fs.readdir('./resumes/', function(err, filenames) {
		filenames.forEach(function(filename) {
			if (filename !== '.gitkeep')
				zip.push({'path': 'resumes/'+filename, 'name': 'resumes/'+filename});
		});

		res.zip(zip, 'resumes.zip');
	});
};
