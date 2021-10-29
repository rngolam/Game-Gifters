const express = require('express');
let router = express.Router();

router.get('/', function(req, res) {
    res.render('pages/index');
});

module.exports = router;