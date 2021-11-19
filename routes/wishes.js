const express = require('express');
const router = express.Router();

getWishes = (res, db, context, complete) => {

    let select_query = 'SELECT wish_id, game_id, games.title AS game_title, wished_by AS associated_employee_id, ' +
    'employees.first_name, employees.last_name, DATE_FORMAT(date_wished, "%c/%e/%Y") AS date_wished, fulfilled ' +
    'FROM wishes ' +
    'INNER JOIN games ON wishes.game_id=games.app_id ' +
    'INNER JOIN employees ON wishes.wished_by=employees.employee_id;';

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

getGames = (res, db, context, complete) => {

    let select_query = 'SELECT * FROM games;';

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


router.get('/', function(req, res) {
    
    let db = req.app.get('mysql');
    let callbackCount = 0
    let context = {page_name: 'wishes'}

    getWishes(res, db, context, complete);
    getGames(res, db, context, complete);

    function complete() {
        callbackCount++;
        if (callbackCount >= 2) {
            res.render('pages/wishes', context)
        }
    }
});

module.exports = router;