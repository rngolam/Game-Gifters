const express = require('express');
const router = express.Router();

function getGames(res, db) {

    const select_query = 'SELECT app_id, title, price FROM games ' + 
    'ORDER BY title;';

    db.pool.query(select_query, function(error, results, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.render('pages/games', {page_name: 'games', data: results});
        }
    });
}

 function addGame(res, data, db) {

    const insert_query = 'INSERT INTO games (app_id, title, price) ' +
    'VALUES (?, ?, ?);';

    const inserts = [data.appID, data.title, data.price];
    
    db.pool.query(insert_query, inserts, function(error, results, fields) {
        
        // Log error
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Send results of query back
            res.send(results);
        }
    });
}

router.get('/', function(req, res) {

    const db = req.app.get('mysql');
    getGames(res, db);
});

router.post('/add-game', function(req, res) {

    const data = req.body;
    const db = req.app.get('mysql');
    addGame(res, data, db);
});

module.exports = router;