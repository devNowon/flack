// config/passport.js

var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('../model/user.model.js');

// expose this function to our app using module.exports
module.exports = function(passport) {
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
};
