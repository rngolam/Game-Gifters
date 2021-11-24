const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.render("pages/index", { page_name: "home" });
});

module.exports = router;
