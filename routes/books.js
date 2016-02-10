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

// Get add new books page
router.get('/new', function(req, res, next) {
  res.render('books/new');
});

// Post new books
router.post('/', function(req, res, next) {
  var newBook = {
    title: req.body.title,
    genre: req.body.genre,
    cover: req.body.cover,
    description: req.body.description
  }
  var newAuthor = {
    first: req.body.first,
    last: req.body.last
  }
  var errors=[];
  errors.push(validate.titleIsNotBlank(req.body.title));
  errors.push(validate.genreIsNotBlank(req.body.genre));
  errors.push(validate.imageIsNotBlank(req.body.cover));
  errors.push(validate.descriptionIsNotBlank(req.body.description));
  errors.push(validate.authorIsNotBlank(req.body.authors));
    errors = errors.filter(function(error) {
      return error.length;
    })
      if (errors.length) {
        res.render('books/new', {errors: errors})
      } else {
        books().insert(newBook).then(function() {
          authors().insert(newAuthor).then(function() {
          res.redirect('/');
      })
    })
  }
});

// Get delete books page
router.get('/:id/delete', function(req, res, next) {
  books().select('*').from('books').leftJoin('credits', function() {
    this.on('id', '=', 'bookID')
      authors().select('*').from('authors').leftJoin('credits', function() {
        this.on('id', '=', 'authorID')
          books().where('id', req.params.id).first().then(function(allBooks) {
            authors().select().then(function(allAuthors) {
              credits().select().then(function(allCredits) {
                res.render('books/delete', {books: allBooks, authors: allAuthors, credits: allCredits})
          })
        })
      })
    })
  })
});

// Delete book
router.post('/:id/delete', function(req, res, next) {
  bookds().where('id', req.params.id).del().then(function() {
    res.redirect('/');
  })
});

// Get edit book page
router.get('/:id/edit', function(req, res, next) {
  books().where('id', req.params.id).first().then(function(book) {
    res.render('books/edit', {books: book});
  })
});

// Edit book
router.post('/:id', function(req, res, next) {
  books().where('id', req.params.id).update(req.body).then(function(book) {
    res.redirect('/books');
  })
})

module.exports = router;
