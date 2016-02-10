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

// Get add new author page
router.get('/new', function(req, res, next) {
  res.render('authors/new');
});

// Post new author
router.post('/', function(req, res, next) {
  var errors=[];
  errors.push(validate.firstIsNotBlank(req.body.first));
  errors.push(validate.lastIsNotBlank(req.body.last));
  errors.push(validate.portraitIsNotBlank(req.body.portrait));
  errors.push(validate.bioIsNotBlank(req.body.bio));
    errors = errors.filter(function(error) {
      return error.length;
    })
      if (errors.length) {
        res.render('authors/new', {errors: errors})
      } else {
        authors().insert(req.body).then(function() {
          res.redirect('/authors');
    })
  }
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

// Get delete authors page
router.get('/:id/delete', function(req, res, next) {
  books().select('*').from('books').leftJoin('credits', function() {
    this.on('id', '=', 'bookID')
      authors().select('*').from('authors').leftJoin('credits', function() {
        this.on('id', '=', 'authorID')
          authors().where('id', req.params.id).first().then(function(allAuthors) {
            books().select().then(function(allBooks) {
              credits().select().then(function(allCredits) {
                res.render('authors/delete', {books: allBooks, authors: allAuthors, credits: allCredits})
          })
        })
      })
    })
  })
});

// Delete authors
router.post('/:id/delete', function(req, res, next) {
  authors().where('id', req.params.id).del().then(function() {
    res.redirect('/authors');
  })
});

// Get individual author page
router.get('/:id', function(req, res, next) {
  books().select('*').from('books').leftJoin('credits', function() {
    this.on('id', '=', 'bookID')
      authors().select('*').from('authors').leftJoin('credits', function() {
        this.on('id', '=', 'authorID')
          authors().where('id', req.params.id).first().then(function(allAuthors) {
            books().select().then(function(allBooks) {
              credits().select().then(function(allCredits) {
                res.render('authors/show', {books: allBooks, authors: allAuthors, credits: allCredits})
          })
        })
      })
    })
  })
});


module.exports = router;
