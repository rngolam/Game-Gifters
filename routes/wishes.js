const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    
    let db = req.app.get('mysql');
    let select_query = 'SELECT wish_id, game_id, games.title AS game_title, wished_by AS associated_employee_id, ' +
    'employees.first_name, employees.last_name, DATE_FORMAT(date_wished, "%c/%e/%Y") AS date_wished, fulfilled ' +
    'FROM wishes ' +
    'INNER JOIN games ON wishes.game_id=games.app_id ' +
    'INNER JOIN employees ON wishes.wished_by=employees.employee_id;';

    db.pool.query(select_query, function(error, results, fields) {

        res.render('pages/wishes', {page_name: 'wishes', data: results});

    });
});

module.exports = router;