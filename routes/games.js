const express = require('express');
const router = express.Router();

function getGames(res, db) {

    let select_query = 'SELECT * FROM games;';

    db.pool.query(select_query, function(error, results, fields) {

        if (error) {
        
            console.log(error);
            res.sendStatus(400);
        
        } else {
            
            // Convert price from cents to dollars
            for (let result of results) {
                result.price = convertPrice(result.price)
            }            
            
            res.render('pages/games', {page_name: 'games', data: results});
        
        }
    });
}

function addGame(res, data, db) {

    let insert_query = 'INSERT INTO games (app_id, title, price) ' +
    'VALUES (?, ?, ?);';

    let inserts = [data.appID, data.title, data.price * 100];
    
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

    let db = req.app.get('mysql');
    getGames(res, db);

});

router.post('/add-game', function(req, res) {

    let data = req.body;
    let db = req.app.get('mysql');
    addGame(res, data, db);
});

convertPrice = (price) => price / 100;

module.exports = router;