var mongoose = require('mongoose');

require('../models/users');

User = mongoose.model('user');


//Get all users.
exports.findAll = function(req, res) {
	User.find({}, function(err, results) {
		return res.send(results);
	});
};

exports.findById = function(req, res) {
   var id = req.params.id;
   User.findOne({'_id':id}, function(err, result) {
       return res.send(result);
   });
};

// Add a user.
exports.add = function(req, res, next) {
	var user = new User(req.body);
	
	user.save(function (err) {
		if (err) {
			return console.log(err);
		}
		return res.json(user);
	});
};

exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
}