var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var companyEventSchema = new Schema({
    title : { type : String, required : true },
    company : { type : String, required : true },
    date : { type : Date},
    location : { type : String},
    description : { type : String},
});

var CompanyEvent = mongoose.model('companyEvents', companyEventSchema);

module.exports = mongoose.model('companyEvents', companyEventSchema);