const express = require('express');
const router = express.Router();

function getEmployees(res, db) {

    let select_query = 'SELECT *, DATE_FORMAT(date_of_birth, "%c/%e/%Y") AS formatted_date_of_birth ' +
    'FROM employees';

    db.pool.query(select_query, function(error, results, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.render('pages/employees', {page_name: 'employees', data: results});
        }
    });
}

function addEmployee(res, data, db) {

    let insert_query = 'INSERT INTO employees (first_name, last_name, department, email, phone, date_of_birth) ' +
    'VALUES (?, ?, ?, ?, ?, ?);';

    let inserts = [data.firstName, data.lastName, data.department, data.email, data.phone, data.birthdate];
    
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
    getEmployees(res, db);

});

router.post('/add-employee', function(req, res) {

    let data = req.body;
    let db = req.app.get('mysql');
    addEmployee(res, data, db);
});

module.exports = router;