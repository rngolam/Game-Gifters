const express = require('express');
const router = express.Router();

// Database
var db = require('../config/db-connector')

router.get('/', function(req, res) {
    
    const select_query = 'SELECT gift_id, gifts.wish_id AS associated_wish_id, games.title AS game_title, ' +
    'fulfilled_by AS sender_id, sender.first_name AS sender_first_name, sender.last_name AS sender_last_name, ' +
    'recipient.first_name AS recipient_first_name, recipient.last_name AS recipient_last_name, date_sent ' +
    'FROM gifts ' +
    'INNER JOIN wishes ON gifts.wish_id=wishes.wish_id ' +
    'INNER JOIN games ON wishes.game_id=games.app_id ' +
    'LEFT JOIN employees AS sender ON gifts.fulfilled_by=sender.employee_id ' +
    'INNER JOIN employees AS recipient ON wishes.wished_by=recipient.employee_id;'

    db.pool.query(select_query, function(error, results, fields) {

        res.render('pages/gifts', {data: results});

    });
});

module.exports = router;