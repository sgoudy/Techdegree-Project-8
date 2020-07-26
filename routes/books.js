const express = require('express');
const router = express.Router();
const Book= require('../models').Book;


/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async(req, res, next) => {
        try {
            await cb(req, res, next)
        } catch(error){
            res.status(500).send(error);
        }
    }
}

// GET ALL BOOKS  
//------------------------------------------------------//

router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render("books/index", { books });
}));
  
  // CREATE A NEW BOOK THEN POST TO DATABASE
  //------------------------------------------------------//
  // GET FORM 

router.get('/new', (req, res) => {
    res.render("books/new", { book: {} });
});

  // POST BOOK 

router.post('/', asyncHandler(async (req, res) => {
    let book;
    try {
        book = await Book.create(req.body);
        res.redirect("/books/" + book.id);
    } catch (error) {
        if(error.name === "SequelizeValidationError") { // checking the error
            book = await Book.build(req.body);
            res.render("books/new", { book, errors: error.errors, title: "New Book" })
        } else {
            throw error; // error caught in the asyncHandler's catch block
        }  
    }
}));

// GET BOOK DETAILS FOR EDIT / DELETE
//------------------------------------------------------//
// GET DETAILS

router.get('/:id', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
        res.render("books/show", { book, title: book.title });  
    } else {
        res.sendStatus(404);
    }
    res.render("books/show", { book, title: book.title }); 
}));
  

// POST UPDATE
router.post('/:id/edit', asyncHandler(async (req, res) => {
    let book;
    try {
        book = await Book.findByPk(req.params.id);
        if(book) {
            await book.update(req.body);
            res.redirect("/books"); 
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        if(error.name === "SequelizeValidationError") {
            book = await Book.build(req.body);
            book.id = req.params.id; // make sure correct book gets updated
            res.render("books/show", { book, errors: error.errors, title: "Update Book" })
        } else {
            res.render("books/show", { book, errors: error.errors, title: "Update Book" })
        }
    }
}));

// POST DELETION
  router.post('/:id/delete', asyncHandler(async (req ,res) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
      await book.destroy();
      res.redirect("/books");
    } else {
      res.sendStatus(404);
    }
    await book.destroy();
    res.redirect("/books");
  }));
  
  module.exports = router;