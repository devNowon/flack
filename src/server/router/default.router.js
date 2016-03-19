var express = require('express');
var router = express.Router();

router.get('/api/env', function(req, res) {
    if (process.env.ENV === "HEROKU") {
        res.send('REMOTE');
    } else {
        res.send('LOCAL');
    }
});

module.exports = router;