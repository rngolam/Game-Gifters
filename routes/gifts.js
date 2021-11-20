const express = require('express');
const router = express.Router();

function getGifts(res, db, context, complete) {
    
    const select_query = 'SELECT gift_id, gifts.wish_id AS associated_wish_id, games.title AS game_title, ' +
    'fulfilled_by AS sender_id, sender.first_name AS sender_first_name, sender.last_name AS sender_last_name, ' +
    'recipient.first_name AS recipient_first_name, recipient.last_name AS recipient_last_name, DATE_FORMAT(date_sent, "%c/%e/%Y") AS date_sent_formatted ' +
    'FROM gifts ' +
    'INNER JOIN wishes ON gifts.wish_id=wishes.wish_id ' +
    'INNER JOIN games ON wishes.game_id=games.app_id ' +
    'LEFT JOIN employees AS sender ON gifts.fulfilled_by=sender.employee_id ' +
    'INNER JOIN employees AS recipient ON wishes.wished_by=recipient.employee_id ' +
    'ORDER BY date_sent DESC;';

    db.pool.query(select_query, function(error, results, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400)
        } else {
            context.data = results;
            complete();
        }
    });
}

function getGames(res, db, context, complete) {

    const select_query = 'SELECT app_id, title FROM games ' +
    'ORDER by title;';

    db.pool.query(select_query, function(error, results, fields) {

        if (error) {        
            console.log(error);
            res.sendStatus(400);
        
        } else {
            context.games = results;
            complete();        
        }
    });
}

function getEmployees(res, db, context, complete) {

    const select_query = 'SELECT employee_id, first_name, last_name FROM employees '
    'ORDER by first_namee, last_name, employee_id;';

    db.pool.query(select_query, function(error, results, fields) {

        if (error) {        
            console.log(error);
            res.sendStatus(400);
        
        } else {
            context.employees = results;
            complete();        
        }
    });    
}

router.get('/', function(req, res) {
    
    const db = req.app.get('mysql');
    let callbackCount = 0
    const context = {page_name: 'gifts'}

    getGifts(res, db, context, complete);
    getGames(res, db, context, complete);
    getEmployees(res, db, context, complete);

    function complete() {
        callbackCount++;
        if (callbackCount >= 3) {
            res.render('pages/gifts', context)
        }
    }
});

module.exports = router;