const express = require('express');
const router = express.Router();

function getWishes(res, db, context, complete) {

    const select_query = `SELECT wish_id, game_id, games.title AS game_title, wished_by AS associated_employee_id,
    employees.first_name, employees.last_name, DATE_FORMAT(date_wished, "%c/%e/%Y") AS date_wished_formatted, fulfilled
    FROM wishes
    INNER JOIN games ON wishes.game_id=games.app_id
    INNER JOIN employees ON wishes.wished_by=employees.employee_id
    ORDER BY fulfilled, date_wished;`;

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

    const select_query = `SELECT app_id, title FROM games
    ORDER by title;`;

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

    const select_query = `SELECT employee_id, first_name, last_name FROM employees
    ORDER by first_name, last_name, employee_id;`;

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

function addWish(res, data, db) {

        const insert_query = `INSERT INTO wishes (game_id, wished_by, date_wished)
        'VALUES (?, ?, ?)`;

        const inserts = [data.gameID, data.employeeID, data.dateWished]

        db.pool.query(insert_query, inserts, function(error, results, fields) {

            if (error) {
                console.log(error);
                res.sendStatus(400);
            
            } else {

                res.send(results);

        }
    })
}


router.get('/', function(req, res) {
    
    const db = req.app.get('mysql');
    let callbackCount = 0
    const context = {page_name: 'wishes'}

    getWishes(res, db, context, complete);
    getGames(res, db, context, complete);
    getEmployees(res, db, context, complete);

    function complete() {
        callbackCount++;
        if (callbackCount >= 3) {
            res.render('pages/wishes', context)
        }
    }
});

router.post('/add-wish', function(req, res) {

    const data = req.body;
    const db = req.app.get('mysql');
    addWish(res, data, db);
})

module.exports = router;