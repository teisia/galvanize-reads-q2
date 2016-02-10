var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var validate = require('../lib/validations');

function books() {
  return knex('books');
}

function authors() {
  return knex('authors');
}

function credits() {
  return knex('credits');
}

// Get authors homepage
router.get('/', function(req, res, next) {
  books().select('*').from('books').leftJoin('credits', function() {
    this.on('id', '=', 'bookID')
      authors().select('*').from('authors').leftJoin('credits', function() {
        this.on('id', '=', 'authorID')
          books().select().then(function(allBooks) {
            authors().select().then(function(allAuthors) {
              credits().select().then(function(allCredits) {
                res.render('authors/index', {books: allBooks, authors: allAuthors, credits: allCredits})
          })
        })
      })
    })
  })
});

// Get edit author page
router.get('/:id/edit', function(req, res, next) {
  authors().where('id', req.params.id).first().then(function(author) {
    res.render('authors/edit', {authors: author});
  })
});

// Edit author
router.post('/:id', function(req, res, next) {
  authors().where('id', req.params.id).update(req.body).then(function(author) {
    res.redirect('/authors');
  })
});



module.exports = router;
