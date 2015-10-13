var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    postdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
