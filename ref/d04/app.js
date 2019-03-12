const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const createError = require('http-errors');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/categories', require('./routes/categories'));

app.use((req, res, next) => {
  next(createError(404, 'This route does not exist.'));
});

app.use((err, req, res, next) => {

  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page

  let errorView = 'error';
  const status = err.status || 500;

  if (status === 404) {
    errorView = 'error-404';
  }

  if (status === 500) {
    // logger.error(err.stack);
  }

  res.status(status).render(errorView);
});

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`WebApp is running at http://localhost:${port}`);
})