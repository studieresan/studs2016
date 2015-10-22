var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var companyEventSchema = new Schema({
    title : { type : String, required : true },
    company : { type : String, required : true },
    date : { type : Date},
    location : { type : String},
    description : { type : String},
});

module.exports = mongoose.model('company_event', companyEventSchema);
