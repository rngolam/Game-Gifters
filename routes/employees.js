const express = require('express');
const router = express.Router();

// Database
const db = require('../config/db-connector')

router.get('/', function(req, res) {

    const select_query = 'SELECT *, DATE_FORMAT(date_of_birth, "%c/%e/%Y") AS formatted_date_of_birth FROM employees';

    db.pool.query(select_query, function(error, results, fields) {

        res.render('pages/employees', {page_name: 'employees', data: results});

    });
});

module.exports = router;