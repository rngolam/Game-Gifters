const express = require("express");
const router = express.Router();
const resetTableQuery = require("../diagnostic/resetTablesQuery").query;

resetTables = (res, db) => {
    db.pool.query(resetTableQuery, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send("Tables reset!");
        }
    });
};

router.get("/", function (req, res) {
    let db = req.app.get("mysql");
    resetTables(res, db);
});

module.exports = router;
