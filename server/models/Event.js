var mongoose = require('mongoose');
var slug     = require('slug');

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
	this.slug = slug(this.title);
	next();
});

module.exports = mongoose.model('Event', EventSchema);
