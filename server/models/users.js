var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var options = { discriminatorKey : 'type' };

var userSchema = new Schema({
    email : { type : String, required : true },
    password : { type : String, required : true },
    passwordsalt : { type : String, required : false },
    //type: { type : String, required: true, enum: ['Student', 'Corporation']},
}, options );

userSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.passwordsalt, 10000, 64).toString('base64');
};

userSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

userSchema.pre('save', function(next) {
	if (this.password) {
		this.passwordsalt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});





//Corporation is a special kind of user.
var corporationUserSchema = new mongoose.Schema({
	contact : {type : String}
}, options);

//Student is a special kind of user.
var studentUserSchema = new mongoose.Schema({
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
}, options);


var User = mongoose.model('user', userSchema);

var Corporation = User.discriminator('Corporation', 
	corporationUserSchema, options );
var Student = User.discriminator('Student', 
	studentUserSchema, options );



module.exports = {
	User : mongoose.model('user', userSchema),
	Student : Student,
	Corporation : Corporation
};

//mongoose.model('user', userSchema);

//module.exports = mongoose.model('student', studentUserSchema);
//module.exports = mongoose.model('corporation', corporationUserSchema);

