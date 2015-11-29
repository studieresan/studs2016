var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ResumePostSchema = new Schema({
	type: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	startdate: { type: Date },
	enddate: { type: Date }
});

var ResumeSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	description: { type: String, required: true },
	posts: [ResumePostSchema]
});

module.exports = mongoose.model('Resume', ResumeSchema);
