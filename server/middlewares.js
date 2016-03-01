var users = require('./controllers/usersController');

// ensure that a user of type student is authenticated
exports.ensureStudent = function(req, res, next) {
	if (req.isAuthenticated() && (users.isAdmin(req.user) || users.isOfType(req.user, "student"))) {
		next();
	} else {
		res.sendStatus(401);
	}
};

// ensure that a user that belongs to the event group is authenticated
exports.ensureEventGroup = function(req, res, next) {
	if (req.isAuthenticated() && (users.isAdmin(req.user) || users.isEventGroup(req.user))) {
		next();
	} else {
		res.sendStatus(401);
	}
};

// ensure that a user with admin privileges is authenticated
exports.ensureAdmin = function(req, res, next) {
	if (req.isAuthenticated() && users.isAdmin(req.user)) {
		next();
	} else {
		res.sendStatus(401);
	}
};

// ensure that a user is authenticated
exports.ensureAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.sendStatus(401);
	}
};
