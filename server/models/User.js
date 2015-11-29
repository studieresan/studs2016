var mongoose = require('mongoose');
var crypto   = require('crypto');

var Schema = mongoose.Schema;

var options = { discriminatorKey : 'type' };

var UserSchema = new Schema({
	email: { type : String, required : true },
	password: { type : String, required : true },
	passwordsalt: { type : String, required : false }
}, options);

UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.passwordsalt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

UserSchema.pre('save', function(next) {
	if (this.password) {
		this.passwordsalt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

// corporation is a special kind of user.
var corporationUserSchema = new mongoose.Schema({
	contact : {type : String}
}, options);

// student is a special kind of user.
var studentUserSchema = new mongoose.Schema({
	group: { type : String },
	name: { type : String },
	phone: { type : String },
	adress: { type : String },
	postcode: { type : String },
	city: { type : String },
	linkedin: { type : String },
	instagram: { type : String },
	facebook: { type : String }
}, options);

var User = mongoose.model('User', UserSchema);

var Corporation = User.discriminator('Corporation', corporationUserSchema, options);
var Student = User.discriminator('Student', studentUserSchema, options);

module.exports = {
	User: mongoose.model('User', UserSchema),
	Student: Student,
	Corporation: Corporation
};
