var mongoose = require('mongoose');

users = require('../models/users');
Student = users.Student;
Corporation = users.Corporation;
User = mongoose.model('user');
//Student = mongoose.model('student');
//Corporation = mongoose.model('corporation');

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

// Add a student user.
exports.addStudent = function(req, res, next) {
	var student = new Student(req.body);
	
	student.save(function (err) {
		if (err) {
			return console.log(err);
		}
		return res.json(student);
	});
};


// Add a corporation user.
exports.addCorporation = function(req, res, next) {
	var corporation = new Corporation(req.body);
	
	corporation.save(function (err) {
		if (err) {
			return console.log(err);
		}
		return res.json(corporation);
	});
};


exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};