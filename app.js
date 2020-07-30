const createError = require('http-errors');
const express = require('express');
const path = require('path');

const routes = require('./routes/index');
const books = require('./routes/books');

const app = express();

// view engine setup
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/books', books);

// CATCH 404 AND FWD TO ERROR HANDLER
// ------------------------------------------------------------------//
app.use((req, res, next) => {
    console.log('404 error handler called');
    res.status(404).render("not_found")
  });

// /* Global error handler */
app.use((err, req, res, next) => {
    if (err) {
      console.log('Global error handler called', err);
    } if (err.status === 404){
        console.log('Error: 404')
      res.status(404).render("not_found", {err});
    } else {
      err.message === err.message || 'General error';
      console.log('Error: 500');
      res.status(err.status || 500).render("server_err", {err})
   }
  });


// SERVER //
// ------------------------------------------------------------------//
app.listen(3000, () => {
    console.log('This app is listening on localhost: 3000')
});

module.exports = app;
