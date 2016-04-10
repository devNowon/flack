var User = require('../model/user.model.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var ObjectId = require ('mongoose').Types.ObjectId;
router.post('/api/signin', passport.authenticate('local'),
    function(req, res) {
        console.log(req.user);
        res.send(req.user);

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

router.get('/api/getName/:id', function(req, res) {
    User.findOne({_id: ObjectId(req.params.id)}, function(err, user){
        res.send({nickname: user.username});
    })
  
});

router.get('/api/signout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;