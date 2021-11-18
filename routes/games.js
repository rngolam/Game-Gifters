const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    
    let db = req.app.get('mysql');
    let select_query = 'SELECT * FROM games;';

    db.pool.query(select_query, function(error, results, fields) {

        // Convert price from cents to dollars
        for (let result of results) {
            result.price = convertPrice(result.price)
        }

        res.render('pages/games', {page_name: 'games', data: results});

    });
});

function convertPrice(price) {
    return price / 100;
}

module.exports = router;