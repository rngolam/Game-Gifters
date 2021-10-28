// Environmental variables
var dotenv = require('dotenv').config();

var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// Set root directory for static assets
app.use(express.static('public'));

const index = require('./routes/index');
const employees = require('./routes/employees');
const games = require('./routes/games');
const gifts = require('./routes/gifts');
const wishes = require('./routes/wishes');

app.use('/', index);
app.use('/employees', employees);
app.use('/games', games);
app.use('/gifts', gifts);
app.use('/wishes', wishes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}; press Ctrl-C to terminate.`);
});