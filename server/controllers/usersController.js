var mongoose = require('mongoose');

users  = require('../models/User');
Resume = require('../models/Resume');

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
	var resume = new Resume();

	student.save(function(err) {
		if (err) {
			return console.log(err);
		}
		resume.student = student._id;
		resume.save(function(err) {});
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

// Change the users password
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

/*
*	Find students. Will return all information about users if logged in
*	otherwise it will only return firstname and lastname of all students.
*/
exports.findStudents = function(req, res, next) {
	if(req.isAuthenticated()) {
		Student.find({}, '-_id -__v', function(err, results) {
			return res.send(results);
		});
	} else {
		Student.find({}, 'firstname lastname -_id', function(err, results) {
			return res.send(results);
		});
	}
};

/*
*	Update the student's details. Will update the fields that are sent in the request body.
*	No need to send every field.
*/
exports.updateStudent = function(req, res, next) {
	Student.findById(req.user.id, function(err, user) {
		if(!user)
			return res.sendStatus(404);

		for(var field in Student.schema.paths) {
			if(field !== '_id' && field !== '__v' && field !== 'password' && field !== 'passwordsalt' && field !== 'email') {
				if(req.body[field] !== undefined) {
					user[field] = req.body[field];
				}
			}
		}
		user.save(function(err) {
			res.json(user);
		});
	});
}

exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};
