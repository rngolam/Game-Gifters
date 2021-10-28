const express = require('express');
let router = express.Router();

// Database
var db = require('../config/db-connector')

router.get('/', function(req, res) {
    res.render('pages/games');
});

module.exports = router;