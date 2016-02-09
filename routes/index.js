var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function books() {
  return knex('books');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Galvanize Reads' });
});

module.exports = router;
