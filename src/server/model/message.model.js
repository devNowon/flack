var mongoose = require('mongoose');

// define the schema for our user model
var messageSchema = new mongoose.Schema({});

// create the model for users and expose it to our app
module.exports = mongoose.model('Message', messageSchema);
