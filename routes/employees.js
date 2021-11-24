const express = require("express");
const router = express.Router();

function getEmployees(res, db) {
    const select_query = `SELECT employee_id, first_name, last_name, department, email, phone,
    DATE_FORMAT(date_of_birth, "%c/%e/%Y") AS formatted_date_of_birth
    FROM employees
    ORDER BY last_name, first_name, employee_id;`;

    db.pool.query(select_query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.render("pages/employees", {
                page_name: "employees",
                data: results,
            });
        }
    });
}

function addEmployee(res, data, db) {
    const insert_query = `INSERT INTO employees (first_name, last_name, department, email, phone, date_of_birth)
    'VALUES (?, ?, ?, ?, ?, ?);`;

    const inserts = [
        data.firstName,
        data.lastName,
        data.department,
        data.email,
        data.phone,
        data.birthdate,
    ];

    db.pool.query(insert_query, inserts, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send(results);
        }
    });
}

router.get("/", function (req, res) {
    const db = req.app.get("mysql");
    getEmployees(res, db);
});

router.post("/add-employee", function (req, res) {
    const data = req.body;
    const db = req.app.get("mysql");
    addEmployee(res, data, db);
});

module.exports = router;
