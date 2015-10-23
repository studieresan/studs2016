var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var companyEventSchema = new Schema({
    title : { type : String, required : true, unique : true},
    company : { type : String, required : true },
    date : { type : Date},
    location : { type : String},
    description : { type : String},
    slug : { type : String, unique : true },
});

companyEventSchema.pre('save', function(next) {
    var text = this.title;
    this.slug = text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    next();
});

module.exports = mongoose.model('company_event', companyEventSchema);
