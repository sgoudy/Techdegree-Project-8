const express = require('express');
const router = express.Router();
const Book= require('../models').Book;


/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async(req, res, next) => {
        try {
            await cb(req, res, next)
        } catch(err){
            console.log("Sorry, the page you're looking for does not exist!");
            res.render("not_found");
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
    const book = await Book.create(req.body);
    res.redirect("/books/" + book.id);
}));

// GET BOOK DETAILS FOR EDIT / DELETE
//------------------------------------------------------//

// GET DETAILS
router.get('/:id', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    res.render("books/show", { book, title: book.title });  
}));
  
// POST UPDATE
router.post('/:id/edit', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    await book.update(req.body);
    res.redirect("/books"); 
}));

// POST DELETION
router.post('/:id/delete', asyncHandler(async (req ,res) => {
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
    res.redirect("/books");
  }));
  
  module.exports = router;