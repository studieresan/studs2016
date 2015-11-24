var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CvPostSchema = new Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    startdate: { type: Date },
    enddate: { type: Date }
});

var CvSchema = new Schema({
    //user: { type: Schema.Types.ObjectId, ref: 'user'},
    description : { type: String, required: true },
    posts : [CvPostSchema]
});

module.exports = mongoose.model('cv_post', CvPostSchema);
module.exports = mongoose.model('cv', CvSchema);
