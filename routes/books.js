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
    res.render("books/index", { books, title: "Library" });
  }));
  




//   /* Create a new article form. */
//   router.get('/new', (req, res) => {
//     res.render("articles/new", { article: {}, title: "New Article" });
//   });
  
//   /* POST create article. */
//   router.post('/', asyncHandler(async (req, res) => {
//     let article;
//     try {
//       article = await Article.create(req.body);
//       res.redirect("/articles/" + article.id);
//     } catch (error) {
//       if(error.name === "SequelizeValidationError") { // checking the error
//         article = await Article.build(req.body);
//         res.render("articles/new", { article, errors: error.errors, title: "New Article" })
//       } else {
//         throw error; // error caught in the asyncHandler's catch block
//       }  
//     }
//   }));
  
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
  
//   /* GET individual article. */
//   router.get("/:id", asyncHandler(async (req, res) => {
//     const article = await Article.findByPk(req.params.id);
//     if(article) {
//       res.render("articles/show", { article, title: article.title });  
//     } else {
//       res.sendStatus(404);
//     }
//     res.render("articles/show", { article, title: article.title }); 
//   }));
  
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
  
//   /* Delete article form. */
//   router.get("/:id/delete", asyncHandler(async (req, res) => {
//     const article = await Article.findByPk(req.params.id);
//     if(article) {
//       res.render("articles/delete", { article, title: "Delete Article" });
//     } else {
//       res.sendStatus(404);
//     }
//     res.render("articles/delete", { article, title: "Delete Article" });
//   }));
  
//   /* Delete individual article. */
//   router.post('/:id/delete', asyncHandler(async (req ,res) => {
//     const article = await Article.findByPk(req.params.id);
//     if(article) {
//       await article.destroy();
//       res.redirect("/articles");
//     } else {
//       res.sendStatus(404);
//     }
//     await article.destroy();
//     res.redirect("/articles");
//   }));
  
  module.exports = router;