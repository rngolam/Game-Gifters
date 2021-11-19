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

addWish = (res, data, db) => {

    // Get employee
    let employee_search_query = 'SELECT employee_id FROM employees ' +
    'WHERE first_name = ? AND last_name = ?';

    let inserts = [data.employeeFirstName, data.employeeLastName]

    db.pool.query(employee_search_query, inserts, function(error, results, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        
        } else {
            
            data.fulfilled = data.fulfilled || 0;
            let employee_id = results[0].employee_id;

            let insert_query = 'INSERT INTO wishes (game_id, wished_by, date_wished, fulfilled) ' +
            'VALUES (?, ?, ?, ?)';

            let inserts = [data.gameID, employee_id, data.dateWished, data.fulfilled]

            db.pool.query(insert_query, inserts, function(error, results, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                
                } else {

                    res.send(results);

                }
            })
        }
    })

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

router.post('/add-wish', function(req, res) {

    let data = req.body;
    let db = req.app.get('mysql');
    addWish(res, data, db);

})

module.exports = router;