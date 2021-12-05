const express = require("express");
const router = express.Router();

function getEmployees(res, db) {
    const selectQuery = `SELECT employee_id, first_name, last_name, department, email, phone,
    DATE_FORMAT(date_of_birth, "%c/%e/%Y") AS formatted_date_of_birth
    FROM employees
    ORDER BY last_name, first_name, employee_id;`;

    db.pool.query(selectQuery, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            const scripts = [
                "modals.js",
                "addEmployee.js",
                "updateEmployee.js",
                "convertDateString.js",
                "clearForm.js"
            ];
            res.render("pages/employees", {
                page_name: "employees",
                employees: results,
                scripts: scripts,
            });
        }
    });
}

function addEmployee(res, data, db) {
    const insertQuery = `INSERT INTO employees (first_name, last_name, department, email, phone, date_of_birth)
    VALUES (?, ?, ?, ?, ?, ?);`;

    const inserts = [
        data.firstName,
        data.lastName,
        data.department,
        data.email,
        data.phone,
        data.birthdate,
    ];

    db.pool.query(insertQuery, inserts, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send(results);
        }
    });
}

function updateEmployee(res, data, db) {
    const updateQuery = `UPDATE employees
    SET first_name=?,
    last_name=?,
    department=?,
    email=?,
    phone=?,
    date_of_birth=?
    WHERE employee_id=?;`;

    const inserts = [
        data.firstName,
        data.lastName,
        data.department,
        data.email,
        data.phone,
        data.birthdate,
        data.employeeID,
    ];

    db.pool.query(updateQuery, inserts, function (error, results, fields) {
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

router.put("/update-employee", function (req, res) {
    const data = req.body;
    const db = req.app.get("mysql");
    updateEmployee(res, data, db);
});

module.exports = router;
