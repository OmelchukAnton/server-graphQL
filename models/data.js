const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
	username: String,
	date: Date
});


module.exports = mongoose.model('times', dataSchema);