var express = require('express');
var exphbs = require('express-handlebars');
var morgan = require('morgan');
var bodyParser = require('body-parser');

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
  // res.end('hello express');
  res.render('home');
})

app.get('/error', (req, res) => {
  res.render('error', { layout: false });
})

var port = 3000;
app.listen(port, () => {
  console.log(`server is running at port http://localhost:${port}`);
});