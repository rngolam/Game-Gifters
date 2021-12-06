const express = require("express");
const router = express.Router();

function getGifts(res, db, context, complete) {
    const selectQuery = `SELECT gift_id, gifts.wish_id AS associated_wish_id, games.title AS game_title,
    fulfilled_by AS sender_id, sender.first_name AS sender_first_name, sender.last_name AS sender_last_name,
    recipient.first_name AS recipient_first_name, recipient.last_name AS recipient_last_name, DATE_FORMAT(date_sent, "%c/%e/%Y") AS formatted_date_sent
    FROM gifts
    INNER JOIN wishes ON gifts.wish_id=wishes.wish_id
    INNER JOIN games ON wishes.game_id=games.app_id
    LEFT JOIN employees AS sender ON gifts.fulfilled_by=sender.employee_id
    INNER JOIN employees AS recipient ON wishes.wished_by=recipient.employee_id
    ORDER BY date_sent DESC;`;

    db.pool.query(selectQuery, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            context.gifts = results;
            complete();
        }
    });
}

function getUnfulfilledWishes(res, db, context, complete) {
    const selectQuery = `SELECT wish_id, game_id, games.title AS game_title, wished_by AS associated_employee_id,
    employees.first_name, employees.last_name
    FROM wishes
    INNER JOIN games ON wishes.game_id=games.app_id
    INNER JOIN employees ON wishes.wished_by=employees.employee_id
    WHERE fulfilled=0
    ORDER BY first_name, last_name, associated_employee_id, game_title;`;

    db.pool.query(selectQuery, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            context.unfulfilledWishes = results;
            complete();
        }
    });
}

function getEmployees(res, db, context, complete) {
    const selectQuery =
        "SELECT employee_id, first_name, last_name FROM employees ";
    ("ORDER by first_name, last_name, employee_id;");

    db.pool.query(selectQuery, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            context.employees = results;
            complete();
        }
    });
}

function addGift(res, data, db) {
    const insertQuery = `INSERT INTO gifts (wish_id, fulfilled_by, date_sent)
    VALUES (?, ?, ?);`;

    const updateFulfilledQuery = `UPDATE wishes
    SET fulfilled=1
    WHERE wish_id=?;`;

    data.senderID = data.senderID || null;
    const inserts = [data.wishID, data.senderID, data.dateSent];

    db.pool.query(
        insertQuery,
        inserts,
        function (insertError, insertResults, insertFields) {
            db.pool.query(
                updateFulfilledQuery,
                data.wishID,
                function (updateError, updateResults, insertFields) {
                    if (insertError) {
                        console.log(insertError);
                        res.sendStatus(400);
                    } else {
                        res.send(insertResults);
                    }
                }
            );
        }
    );
}

function updateGift(res, data, db) {
    const updateQuery = `UPDATE gifts
    SET fulfilled_by=?,
    date_sent=?
    WHERE gift_id=?;`;

    const inserts = [data.senderID, data.dateSent, data.giftID];

    db.pool.query(updateQuery, inserts, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send(results);
        }
    });
}

function deleteGift(res, data, db) {
    const placeholders = data.deleteIDs.map((id) => `?`);

    const selectWishesQuery = `SELECT gifts.wish_id FROM gifts
    INNER JOIN wishes ON gifts.wish_id = wishes.wish_id
    WHERE gifts.gift_id IN (${placeholders});`;

    const deleteQuery = `DELETE FROM gifts WHERE gift_id IN (${placeholders});`;

    const updateFulfilledQuery = `UPDATE wishes
    SET fulfilled=0
    WHERE wish_id IN (${placeholders});`;

    const giftsToDelete = data.deleteIDs;

    db.pool.query(
        selectWishesQuery,
        giftsToDelete,
        function (selectError, selectResults, selectFields) {
            db.pool.query(
                deleteQuery,
                giftsToDelete,
                function (deleteError, deleteResults, deleteFields) {
                    // Condense the returned wish IDs into a 1-dimensional array
                    const toUpdate = selectResults.map((row) => row.wish_id);

                    db.pool.query(
                        updateFulfilledQuery,
                        toUpdate,
                        function (updateError, updateResults, updateFields) {
                            if (deleteError) {
                                console.log(deleteError);
                                res.sendStatus(400);
                            } else {
                                res.send(deleteResults);
                            }
                        }
                    );
                }
            );
        }
    );
}

router.get("/", function (req, res) {
    const db = req.app.get("mysql");
    let callbackCount = 0;
    const scripts = [
        "modals.js",
        "addGift.js",
        "updateGift.js",
        "deleteGift.js",
        "convertDateString.js",
        "clearForm.js",
    ];
    const context = { page_name: "gifts", scripts: scripts };

    getGifts(res, db, context, complete);
    getUnfulfilledWishes(res, db, context, complete);
    getEmployees(res, db, context, complete);

    function complete() {
        callbackCount++;
        if (callbackCount >= 3) {
            res.render("pages/gifts", context);
        }
    }
});

router.post("/", function (req, res) {
    const data = req.body;
    const db = req.app.get("mysql");
    addGift(res, data, db);
});

router.put("/", function (req, res) {
    const data = req.body;
    const db = req.app.get("mysql");
    updateGift(res, data, db);
});

router.delete("/", function (req, res) {
    const data = req.body;
    const db = req.app.get("mysql");
    deleteGift(res, data, db);
});

module.exports = router;
