var mongoose = require('mongoose');
var crypto   = require('crypto');
var slug     = require('slug');

var Schema = mongoose.Schema;

var options = { discriminatorKey : 'type' };

var UserSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	passwordsalt: { type: String, required: false }
}, options);

// override default toJSON
UserSchema.set('toJSON', {
	virtuals: true,
	transform: function(doc, ret) {
		delete ret.password;     // exclude password
		delete ret.passwordsalt; // exclude password salt
		return ret;
	}
});

UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.passwordsalt, 10000, 64)
	             .toString('base64');
};

UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

UserSchema.methods.beforeSavePassword = function() {
	if (this.password) {
		this.passwordsalt = new Buffer(crypto.randomBytes(16)
		    .toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
};

// company is a special kind of user.
var CompanyUserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	contact: { type: String },
	eventDataBeforeURL: { type: String },
	eventDataAfterURL: { type: String }
}, options);

// student is a special kind of user.
var StudentUserSchema = new mongoose.Schema({
	group: { type: String },
	firstname: { type: String },
	lastname: { type: String },
	phone: { type: String },
	address: { type: String },
	postcode: { type: String },
	city: { type: String },
	linkedin: { type: String },
	instagram: { type: String },
	facebook: { type: String }
}, options);

// add a virtual property for a hash: sha1(firsname-lastname)
StudentUserSchema.virtual('hash').get(function() {
	return crypto.createHash('sha1').update(
		slug(this.firstname + '-' + this.lastname, { lower: true })
	).digest('hex');
});

// add a virtual property for full name
StudentUserSchema.virtual('fullname').get(function() {
	return this.firstname + ' ' + this.lastname;
});

var User = mongoose.model('User', UserSchema);

var Company = User.discriminator(
	'Company',
	CompanyUserSchema, options
);

var Student = User.discriminator(
	'Student',
	StudentUserSchema, options
);

module.exports = {
	User: mongoose.model('User', UserSchema),
	Student: Student,
	Company: Company
};
