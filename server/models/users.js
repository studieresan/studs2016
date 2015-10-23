var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var options = { discriminatorKey : 'role' };

var userSchema = new Schema({
    email : { type : String, required : true },
    passwordhashed : { type : String, required : true },
    passwordsalt : { type : String, required : false }
}, options );

userSchema.pre('save', function(next) {
	if (this.passwordhashed) {
		this.passwordsalt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.passwordhashed = this.hashPassword(this.passwordhashed);
	}
	next();
});

userSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.passwordsalt, 10000, 64).toString('base64');
};

var User = mongoose.model('user', userSchema);


//Corporation is a special kind of user.
var CorporationSchema = User.discriminator( 'Corporation', 
	new mongoose.Schema({
		contact : { type : String}
	}, options ));

//Student is a special kind of user.
var StudentSchema = User.discriminator( 'Student',
	new mongoose.Schema({
		group : { type : String},
		name : { type : String},
		phone : { type : String},
		adress : { type : String},
		postcode : { type : String},
		city : { type : String},
		linkedin : { type : String},
		instagram : { type : String},
		facebook : { type : String},
		cvid : { type : String}
	}, options ));



//mongoose.model('user', userSchema);
//	Corporation = mongoose.model('corporation', CorporationSchema),
//	Student = mongoose.model('student', StudentSchema);
module.exports = mongoose.model('user', userSchema);
