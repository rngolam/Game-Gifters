const express = require('express');
const router = express.Router();

// Database
const db = require('../config/db-connector')

router.get('/', function(req, res) {

    const select_query = 'SELECT * FROM employees;';

    db.pool.query(select_query, function(error, results, fields) {

        res.render('pages/employees', {data: results});

    });
});

module.exports = router;