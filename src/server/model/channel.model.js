var mongoose = require('mongoose');

// define the schema for our user model
var channelSchema = new mongoose.Schema({
  name: String,
  type: String,
  teamId: mongoose.Schema.ObjectId,
  members: Array,
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Channel', channelSchema);