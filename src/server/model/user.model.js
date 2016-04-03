var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// define the schema for our user model
var userSchema = new mongoose.Schema({
  email : String,
  nickname : String,
  note : String,
  channel : Array,
  teamId : Array,
  sessionId : String,
},{
	timestamps: true
});

userSchema.plugin(passportLocalMongoose, {
  usernameUnique: 'true'
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
