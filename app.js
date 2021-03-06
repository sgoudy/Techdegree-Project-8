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
    console.log('Global Error Handler: 404 error handler called');
    res.status(404).render("page-not-found")
  });

// /* Global error handler */
app.use((err, req, res, next) => {
    if (err) {
      console.log('Global error handler called', err);
    } if (err.status === 404){
        console.log('Error: 404')
      res.status(404).render("page-not-found", {err});
    } else {
      err.message === err.message || 'General error';
      console.log('Error: 500');
      res.status(err.status || 500).render("error", {err, title: "Page Not Found"})
   }
  });



// SERVER //
// ------------------------------------------------------------------//
app.set('port', (process.env.PORT || 5000));

//For avoiding Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

module.exports = app;
