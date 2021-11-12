const express = require('express');
const router = express.Router();

// Database
var db = require('../config/db-connector')

router.get('/', function(req, res) {
    
    const select_query = 'SELECT * FROM games;';

    db.pool.query(select_query, function(error, results, fields) {

        res.render('pages/games', {data: results});

    });
});

module.exports = router;