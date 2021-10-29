const express = require('express');
let router = express.Router();

// Database
var db = require('../config/db-connector')

router.get('/', function(req, res) {
        
    // Define our queries
    query1 = 'DROP TABLE IF EXISTS diagnostic;';
    query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
    query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
    query4 = 'SELECT * FROM diagnostic;';

    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

    // DROP TABLE...
    db.pool.query(query1, function (err, results, fields){

        // CREATE TABLE...
        db.pool.query(query2, function(err, results, fields){

            // INSERT INTO...
            db.pool.query(query3, function(err, results, fields){

                // SELECT *...
                db.pool.query(query4, function(err, results, fields){

                    // Send the results to the browser
                    let base = "<h1>MySQL Results:</h1>"

                    var mascots = [
                        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
                        { name: 'Tux', organization: "Linux", birth_year: 1996},
                        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
                        ];
                        var tagline = "No programming concept is complete without a cute animal mascot.";
                    
                    res.render('pages/index', {
                        base: base,
                        results: JSON.stringify(results),
                        mascots: mascots,
                        tagline: tagline
                    });
                });
            });
        });
    });
});

module.exports = router;