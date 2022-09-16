/* This is Customer.js */

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp',{ useNewUrlParser: true });

var Schema = mongoose.Schema;

var customerSchema = new Schema({
		firstname: {type: String, required: true},
		lastname: {type: String, required: true},
		email: {type: String, required: true},
		age: Number,
		sex: String
	})

module.exports = mongoose.model('Customer',customerSchema)
