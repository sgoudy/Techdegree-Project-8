const express = require('express');
const router = express.Router();
const Book= require('../models').Book;


/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async(req, res, next) => {
        try {
            await cb(req, res, next)
        } catch(err){
            console.log("Local Error Handler: Sorry, the page you're looking for does not exist!");
            res.render("page-not-found");
        }
    }
}

// GET ALL BOOKS  
//------------------------------------------------------//

router.get('/', asyncHandler(async (req, res) => { 
    const books = await Book.findAll({
        limit: 10,
        order: [['title', 'ASC']]
    });
    res.render("books/index", { books, title: "Books" });
}));

// PAGINATION FEATURE
router.get('/page1', asyncHandler(async (req, res) => { 
    const books = await Book.findAll({
        limit: 10,
        order: [['title', 'ASC']]
    });
    res.render("books/index", { books });
}));

router.get('/page2', asyncHandler(async (req, res) => { 
    const books = await Book.findAll({
        offset: 10,
        limit: 10,
        order: [['title', 'ASC']]
    });
    res.render("books/index", { books });
}));
  
  // CREATE A NEW BOOK THEN POST TO DATABASE
  //------------------------------------------------------//

  // GET FORM 
router.get('/new', (req, res) => {
    res.render("books/new-book", { book: {}, title: "New Book"});
});

  // POST BOOK 
router.post('/', asyncHandler(async (req, res) => {
    let book;
    try {
        book = await Book.create(req.body);
            res.redirect("/books/" + book.id);
            } catch (error) {
        if(error.name === "SequelizeValidationError") { 
            book = await Book.build(req.body);
            res.render("books/new-book", { book, errors: error.errors, title: "New Book" })
        } else {
            throw error; // error caught in the asyncHandler's catch block
        }  
    }
}));

// GET BOOK DETAILS FOR EDIT / DELETE
//------------------------------------------------------//

// GET DETAILS
router.get('/:id', async(req, res, next) => {
        const book= await Book.findByPk(req.params.id);
        if (book){
            res.render("books/update-book", { book, title: book.title });
        } else {
            const err= new Error();
            err.status = 404;
            err.message = "Looks like the book you requested doesn't exist"
            next(err);
        }   
});
    
  
// POST UPDATE
router.post('/:id', asyncHandler(async (req, res) => {
    try {
        let book = await Book.findByPk(req.params.id);
        await book.update(req.body)
        res.redirect("/books/");
        } 
    catch (error) {
        if(error.name === "SequelizeValidationError") { 
            let book = await Book.findByPk(req.params.id);
            res.render("books/update-book", { book, errors: error.errors, title: "Update Book" })
        } else {
            throw error; // error caught in the asyncHandler's catch block
        }  
    }
}));

// POST DELETION
router.post('/:id/delete', asyncHandler(async (req ,res) => {
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
    res.redirect("/books");
  }));

  module.exports = router;