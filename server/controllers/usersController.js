var mongoose = require('mongoose');
var crypto   = require('crypto');
var slug     = require('slug');

users  = require('../models/User');
Resume = require('../models/Resume');

Student = users.Student;
Company = users.Company;

User = mongoose.model('User');

// check if a user belongs to any of the given groups
exports.belongsToGroup = function(user, groups) {
	if (! user || ! user.group || user.type.toLowerCase() !== "student") {
		return false;
	}
	var inGroup = false;
	groups.forEach(function(group) {
		if (user.group.toLowerCase() === group) {
			inGroup = true;
		}
	});
	return inGroup;
};

// determine whether a user is an admin or not
exports.isAdmin = function(user) {
	return this.belongsToGroup(user, ['communication', 'projectleader']);
};

// determine wheter a user belongs to the event group or not
exports.isEventGroup = function(user) {
	return this.belongsToGroup(user, ['event']);
};


var sha1sum = function(input) {
    return crypto.createHash('sha1').update(input).digest('hex');
};

// fetch all users
exports.findAll = function(req, res) {
	User.find({}, function(err, results) {
		return res.send(results);
	});
};

// fetch a user by its id
exports.findById = function(req, res) {
   var id = req.params.id;
   User.findOne({'_id':id}, function(err, result) {
       return res.send(result);
   });
};

// add a user
exports.add = function(req, res, next) {
	var user = new User(req.body);
	user.beforeSavePassword();

	user.save(function (err) {
		if (err) {
			return console.log(err);
		}
		return res.json(user);
	});
};

// delete a user
exports.delete = function(req, res, next) {
	Resume.remove({ student: req.params.id }, function(err) {
		if (err) {
			return next(err);
		}
	});
	User.remove({ _id: req.params.id }, function(err) {
		if (err) {
			return next(err);
		}
		return res.sendStatus(200);
	});
};

// add a user of type student (discriminator)
exports.addStudent = function(req, res, next) {
	var student = new Student(req.body);
	var resume = new Resume();

	student.beforeSavePassword();

	student.save(function(err) {
		if (err) {
			return console.log(err);
		}
	});

	resume.student = student._id;
	resume.save(function(err) {
		if (err) {
			return console.log(err);
		}

		return res.json(student);
	});
};

// add a user of type company (discriminator)
exports.addCompany = function(req, res, next) {
	var company = new Company(req.body);

	company.beforeSavePassword();

	company.save(function (err) {
		if (err) {
			return console.log(err);
		}
		return res.json(company);
	});
};

/*
*	Find companies.
*/
exports.findCompanies = function(req, res, next) {
	Company.find({}, ' -__v', function(err, results) {
		return res.send(results);
	});
};

// change the users password
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

		user.beforeSavePassword();

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
		Student.find({}, ' -__v', function(err, results) {
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
			if(field !== '_id' && field !== '__v' && field !== 'password' && field !== 'passwordsalt' && field !== 'email' && field != 'group') {
				if(req.body[field] !== undefined) {
					user[field] = req.body[field];
				}
			}
		}
		user.save(function(err) {
			res.json(user);
		});
	});
};

/**
*	Changes the details about another user. This function is indended to be used by
*	admins only as it allows to change critical fields.
*/
exports.editStudent = function(req, res, next) {
	var id = req.body.id;
	Student.findById(id, function(err, user) {
		if(!user)
			return res.sendStatus(404);
		for(var field in Student.schema.paths) {
			if(req.body[field] !== undefined) {
				user[field] = req.body[field];
			}
		}

		user.beforeSavePassword();

		user.save(function(err) {
			res.json(user);
		});
	});
};

/**
*	Changes the details about a company. This function is indended to be used by
*	admins only as it allows to change critical fields.
*/
exports.editCompany = function(req, res, next) {
	var id = req.body.id;
	Company.findById(id, function(err, company) {
		if(!company)
			return res.sendStatus(404);
		for(var field in Company.schema.paths) {
			if(req.body[field] !== undefined) {
				company[field] = req.body[field];
			}
		}
		if(req.body.password !== undefined) {
			company.beforeSavePassword();
		}
		company.save(function(err) {
			res.json(company);
		});
	});
};

exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.hashedProfileImages = function(req, res) {
	var hashedProfileImages = [];
	Student.find({}, 'firstname lastname -_id', function(err, results) {
		var hashes = [];
		results.forEach(function(student) {
			var filename = student.firstname+"-"+student.lastname+"-square";
			filename = slug(filename, { lower: true });
			hashes.push(sha1sum(filename)+".jpg");
		});
		return res.send(hashes);
	});
};
