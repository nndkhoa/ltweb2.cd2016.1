var express = require('express');
var exphbs = require('express-handlebars');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var createError = require('http-errors');

var app = express();

app.use(morgan('dev'));
app.engine('hbs', exphbs({
  layoutsDir: 'views/_layouts',
  defaultLayout: 'main.hbs',
}));
app.set('view engine', 'hbs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json());

app.use('/categories', require('./routes/categories'));

app.get('/', (req, res) => {
  res.render('home');
})

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  let errorView = 'error';
  const status = err.status || 500;

  if (status === 404) {
    errorView = '404';
  }

  // app.set('env', 'prod');
  var isProd = app.get('env') === 'prod';
  var message = isProd ? 'An error has occured. Please contact administrator for more support.' : err.message;
  var error = isProd ? {} : err;

  res.status(status).render(errorView, {
    layout: false, message, error
  });
});

var port = 3000;
app.listen(port, () => {
  console.log(`server is running at port http://localhost:${port}`);
});