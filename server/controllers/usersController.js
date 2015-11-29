var mongoose = require('mongoose');

users = require('../models/User');

Student     = users.Student;
Corporation = users.Corporation;

User = mongoose.model('User');

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

exports.changePassword = function(req, res, next) {
	var newPw = req.body.new;
	var oldPw = req.body.old;
	var user = req.user;
	User.findById(user.id, function(err, user) {

		if (!user) {
			return res.sendStatus(404);
		}

		if(!user.authenticate(oldPw))
			return res.sendStatus(401);

		user.password = newPw;

		user.save(function(err) {
			res.json(user);
		});
	});
};

exports.findStudents = function(req, res, next) {
	if(req.isAuthenticated()) {
		Student.find({}, '-passwordsalt -_id -password -__v', function(err, results) {
			return res.send(results);
		});
	} else {
		Student.find({}, 'name -_id', function(err, results) {
			return res.send(results);
		});
	}
};

exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};
