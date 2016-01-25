var users = require('./controllers/usersController');
var resumes = require('./controllers/resumesController');
var events = require('./controllers/eventsController');
var passport = require('passport');

function isAdmin(user) {
	return user && user.type.toLowerCase() === "student" && user.group && user.group.toLowerCase() === "communication";
}

function isEventGroup(user) {
	return user &&  user.group && user.group.toLowerCase() === "event";
}

function ensureStudent(req, res, next) {
	if( req.isAuthenticated() && (isAdmin(req.user) || (req.user && req.user.type.toLowerCase() === "student"))) {
		next();
	} else {
		res.sendStatus(401);
	}
}

function ensureEventGroup(req, res, next) {
	if( req.isAuthenticated() && (isAdmin(req.user) || isEventGroup(req.user))) {
		next();
	} else {
		res.sendStatus(401);
	}
}

function ensureAdmin(req, res, next) {
	if(isAdmin(req.user) && req.isAuthenticated()) {
		next();
	} else {
		res.sendStatus(401);
	}
}

function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()) {
		next();
	} else {
		res.sendStatus(401);
	}
}

module.exports = function(app, express) {

	app.use(function(req, res, next) {
		res.locals.user = req.user ? req.user : '';
		res.locals.authenticated = req.isAuthenticated();
		res.locals.isAdmin = isAdmin(req.user);
		res.locals.isEventGroup = isEventGroup(req.user);
		next();
	});

	// Get
	app.get('/', function(req, res) {
		res.render('index', {
			ngApp: "index",
			title: "Studs!"
		});
	});

	// Need to add wildcard in order to use HTML5
	// nice routes without hashbang
	app.get('/events*', function(req, res) {
		res.render('events/index', {
			// Angular variables
			ngApp: "events",
			// Layout variables
			fixedMenu: true
		});
	});

	// About
	app.get('/about', function(req, res) {
		res.render('about/index', {
			ngApp: "about",
			fixedMenu: true
		});
	});

	// Trip
	app.get('/trip', function(req, res) {
		res.render('trip/index', {
			ngApp: "trip",
			fixedMenu: true
		});
	});

	// Login
	app.get('/login*', function(req, res) {
		res.render('auth/index', {
			ngApp: "auth"
		});
	});

	 // Resumes
	app.get('/profile/resume', function(req, res) {
		console.log("profile");
		res.render('resumes/index', {
			ngApp: "resumes",
            userData: JSON.stringify(res.locals.user)
		});
	});

	app.get('/resume*', function(req, res) {
		console.log("profile");
		res.render('resumes/public', {
			ngApp: "resumes"
		});
	});

	// Profile
	app.get('/profile', ensureAuthenticated, function(req, res) {
		var type = (res.locals.user.type).toLowerCase();
		res.render('profile/' + type, {
			ngApp: type + "Profile",
			// Layout variables
			fixedMenu: true,
			userData: JSON.stringify(res.locals.user)
		});
	});

	/*
	* Auth. functionality
	*/
	app.post('/login', passport.authenticate('local-login'), function(req, res) {
		// This function runs when the authentication is successfull
		// In order to use angular nicely, a simple message is
		// the only thing that is returned in the body
		res.send("success");
	});
	app.get('/logout', users.signout);

	/*
	*   A specific router is used for the api in order to prefix the endpoints
	*/
	var api = express.Router();

	// User-api
	api.get('/users', ensureAdmin, users.findAll);
	api.put('/users/change-password', ensureAuthenticated, users.changePassword);
	api.post('/users', ensureAdmin, users.add);
	api.delete('/users/:id', ensureAdmin, users.delete);
	api.post('/companies', ensureEventGroup, users.addCompany);
	api.get('/companies', ensureEventGroup, users.findCompanies);
	api.get('/students', users.findStudents);
	api.post('/students', ensureAdmin, users.addStudent);
	api.put('/students', ensureAuthenticated, users.updateStudent);
	api.put('/editStudent', ensureAdmin, users.editStudent);

	// Event-api
	api.get('/events', events.findAll);
	api.get('/events/:slug', events.findBySlug);
	api.post('/events', ensureEventGroup, events.add);
	api.put('/events/:id', ensureEventGroup, events.update);
	api.delete('/events/:id', ensureEventGroup, events.remove);

	// resumes
	api.get('/resumes', ensureAuthenticated, resumes.findAll);
	api.get('/resumes/mine', ensureStudent, resumes.findMine);
	api.put('/resumes/mine', ensureStudent, resumes.update);
	api.get('/resumes/generate/:id', resumes.generate); // no auth (!)
	api.get('/resumes/:id', resumes.findByStudentId); // no auth (!)

	// Assign the api router to the app
	app.use("/api", api);
};
