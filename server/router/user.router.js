var User = require('../model/user.model.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/api/signin', passport.authenticate('local'),
function(req, res) {
    res.send('ok');
});

router.post('/api/signup', function(req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
          return res.send(err);
        }
        passport.authenticate('local')(req, res, function () {
            res.send(user);
        });
    });
});

router.get('/api/signout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;