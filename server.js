// Environmental variables
var dotenv = require('dotenv').config();

var express = require('express');
var app = express();

// Database
var db = require('./config/db-connector')

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
        
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



// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.get('/employees', function(req, res) {
    res.render('pages/employees');
});

app.get('/wishes', function(req, res) {
    res.render('pages/wishes');
});

app.get('/gifts', function(req, res) {
    res.render('pages/gifts');
});

app.get('/games', function(req, res) {
    res.render('pages/games');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}; press Ctrl-C to terminate.`);
});