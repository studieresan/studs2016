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

UserSchema.pre('save', function(next) {
	if (this.password) {
		this.passwordsalt = new Buffer(crypto.randomBytes(16)
		    .toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

// company is a special kind of user.
var CompanyUserSchema = new mongoose.Schema({
	contact: {type: String }
}, options);

// student is a special kind of user.
var StudentUserSchema = new mongoose.Schema({
	group: { type: String },
	name: { type: String },
	lastname: { type: String },
	phone: { type: String },
	adress: { type: String },
	postcode: { type: String },
	city: { type: String },
	linkedin: { type: String },
	instagram: { type: String },
	facebook: { type: String }
}, options);

StudentUserSchema.virtual('image')
.get(function() {
    return slug(this.name + '-' + this.lastname) + '.jpg';
});

// override default toJSON
StudentUserSchema.set('toJSON', {
	virtuals: true,
});

var User = mongoose.model('User', UserSchema);

var Company = User.discriminator(
	'Corporation',
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
