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



  /* GET full list of books. */
  router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render("books/index", { books });
  }));
  




  /* Create a new book. */
  router.get('/new', (req, res) => {
    res.render("books/new", { book: {} });
  });


  


  /* POST new book to database. */
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
  
//   /* Edit article form. */
//   router.get("/:id/edit", asyncHandler(async(req, res) => {
//     const article = await Article.findByPk(req.params.id);
//     if(article) {
//       res.render("articles/edit", { article, title: "Edit Article" });      
//     } else {
//       res.sendStatus(404);
//     }
//     res.render("articles/edit", { article, title: "Edit Article" });
//   }));
  







  /* GET individual book. */
  router.get('/:id', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    console.log(book)
    if(book) {
      res.render("books/show", { book, title: book.title });  
    } else {
      res.sendStatus(404);
    }
    res.render("books/show", { book, title: book.title }); 
  }));
  




//   /* Update an article. */
//   router.post('/:id/edit', asyncHandler(async (req, res) => {
//     let article;
//     try {
//       article = await Article.findByPk(req.params.id);
//       if(article) {
//         await article.update(req.body);
//         res.redirect("/articles/" + article.id); 
//       } else {
//         res.sendStatus(404);
//       }
//     } catch (error) {
//       if(error.name === "SequelizeValidationError") {
//         article = await Article.build(req.body);
//         article.id = req.params.id; // make sure correct article gets updated
//         res.render("articles/edit", { article, errors: error.errors, title: "Edit Article" })
//       } else {
//         throw error;
//       }
//     }
//   }));

  
  /* Delete individual article. */
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