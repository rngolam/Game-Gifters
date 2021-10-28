// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'us-cdbr-east-04.cleardb.com',
    user            : 'bd7c1d1344a061',
    password        : 'f7c34804',
    database        : 'heroku_833f8f811c7ce79'
})

// Export it for use in our application
module.exports.pool = pool;