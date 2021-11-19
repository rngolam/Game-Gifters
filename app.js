// Environmental variables
require('dotenv').config();

const express = require('express');
const app = express();
const mysql = require('./config/db-connector')

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set global app db config
app.set('mysql', mysql);

// Handle JSON and Form Data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Set root directory for static assets
app.use(express.static('public'));

// Diagnostic
const resetTables = require('./routes/resetTables');

// Set up routes
const index = require('./routes/index');
const employees = require('./routes/employees');
const games = require('./routes/games');
const gifts = require('./routes/gifts');
const wishes = require('./routes/wishes');

app.use('/reset-tables', resetTables);

app.use('/', index);
app.use('/employees', employees);
app.use('/games', games);
app.use('/gifts', gifts);
app.use('/wishes', wishes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}; press Ctrl-C to terminate.`);
});