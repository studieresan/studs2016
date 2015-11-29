var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EventSchema = new Schema({
	title: { type: String, required: true, unique: true },
	company: { type: String, required: true },
	date: { type: Date },
	location: { type: String },
	description: { type: String },
	slug: { type: String, unique: true },
});

EventSchema.pre('save', function(next) {
	var text = this.title;
	this.slug = text.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
	next();
});

module.exports = mongoose.model('Event', EventSchema);
