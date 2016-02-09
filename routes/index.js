var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// Redirect to books homepage
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
