var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function books() {
  return knex('books');
}

function authors() {
  return knex('authors');
}

function credits() {
  return knex('credits');
}

// Get books homepage
router.get('/', function(req, res, next) {
  books().select('*').from('books').leftJoin('credits', function() {
    this.on('id', '=', 'bookID')
      authors().select('*').from('authors').leftJoin('credits', function() {
        this.on('id', '=', 'authorID')
          books().select().then(function(allBooks) {
            authors().select().then(function(allAuthors) {
              credits().select().then(function(allCredits) {
            res.render('books/index', {books: allBooks, authors: allAuthors, credits: allCredits})
          })
        })
      })
    })
  })
});

module.exports = router;
