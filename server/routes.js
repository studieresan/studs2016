var passport    = require('passport');
var users       = require('./controllers/usersController');
var resumes     = require('./controllers/resumesController');
var events      = require('./controllers/eventsController');
var middlewares = require('./middlewares');

module.exports = function(app, express) {

	app.use(function(req, res, next) {
		res.locals.user = req.user ? req.user : '';
		res.locals.authenticated = req.isAuthenticated();
		res.locals.isAdmin = users.isAdmin(req.user);
		res.locals.isEventGroup = users.isEventGroup(req.user);
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
	app.get('/profile', middlewares.ensureAuthenticated, function(req, res) {
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

	// user-api
	api.get('/users', middlewares.ensureAdmin, users.findAll);
	api.put('/users/change-password', middlewares.ensureAuthenticated, users.changePassword);
	api.post('/users', middlewares.ensureAdmin, users.add);
	api.delete('/users/:id', middlewares.ensureAdmin, users.delete);
	api.get('/companyEventBeforeStats', middlewares.ensureAuthenticated, users.companyEventBeforeStats);
	api.get('/companyEventAfterStats', middlewares.ensureAuthenticated, users.companyEventAfterStats);
	api.post('/companies', middlewares.ensureEventGroup, users.addCompany);
	api.get('/companies', middlewares.ensureEventGroup, users.findCompanies);
	api.put('/companies/:id', middlewares.ensureEventGroup, users.editCompany);
	api.get('/students', users.findStudents);
	api.post('/students', middlewares.ensureAdmin, users.addStudent);
	api.put('/students', middlewares.ensureAuthenticated, users.updateStudent);
	api.put('/editStudent', middlewares.ensureAdmin, users.editStudent);
	api.get('/hashedProfileImages', users.hashedProfileImages);

	// event-api
	api.get('/events', events.findAll);
	api.get('/events/:slug', events.findBySlug);
	api.post('/events', middlewares.ensureEventGroup, events.add);
	api.put('/events/:id', middlewares.ensureEventGroup, events.update);
	api.delete('/events/:id', middlewares.ensureEventGroup, events.remove);

	// resumes
	api.get('/resumes', middlewares.ensureAuthenticated, resumes.findAll);
	api.get('/resumes/mine', middlewares.ensureStudent, resumes.findMine);
	api.put('/resumes/mine', middlewares.ensureStudent, resumes.update);
	api.get('/resumes/all', middlewares.ensureAuthenticated, resumes.downloadAll);
	api.get('/resumes/generate/:id', resumes.generate); // no auth (!)
	api.get('/resumes/:id', resumes.findByStudentId); // no auth (!)

	// assign the api router to the app
	app.use("/api", api);
};
