var mongoose = require('mongoose');

require('../models/users');

User = mongoose.model('user');

exports.findAll = function(req, res) {
	User.find({}, function(err, results) {
		return res.send(results);
	});
};

exports.add = function(req, res) {
	var user = new User();
	user = req.body;

	user.save(function (err) {
		if (err) {
			return console.log(err);
		}
		return res.send(user);
	});
};

