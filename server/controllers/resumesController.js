var mongoose = require('mongoose');

var Resume = require('../models/Resume');

exports.findAll = function(req, res) {
	Resume.find({}).populate('user').exec(function (err, resumes) {
		return res.send(resumes);
	});
};
