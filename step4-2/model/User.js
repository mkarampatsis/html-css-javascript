/* This is User.js */
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

require("dotenv").config();

const uri = process.env.ATLAS_URI;

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once("open", () => {
	console.log("Connected Database Successfully");
});

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var Schema = mongoose.Schema;

var userSchema = new Schema({
		username: {
			type: String, 
			required: [true, 'Username is required field'],
			trim:true,
			lowercase:true, 
			unique: true
		},
		name: {type: String, required: true},
		surname: {type: String, required: true},
		category: {type: String, required: true},
		email: {
			type: String, 
			required: [true, 'Username is required field'],
			trim:true,
			lowercase:true, 
			unique: true,
			// validate: [validateEmail, "Please fill a valid email address"],
    	match: [
      	/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      	"Email address is not valid",
    	],
		}
	});

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);
