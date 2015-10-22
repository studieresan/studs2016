var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var options = { discriminatorKey : 'role' };

var userSchema = new Schema({
    email : { type: String, required: true },
    password : { type: String, required: true },
}, options );

var User = mongoose.model('user', userSchema);


//Corporation is a special kind of user.
var CorporationSchema = User.discriminator( 'Corporation', 
	new mongoose.Schema({
		contact : { type : String}
	}, options ));

//
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
