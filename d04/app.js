var express = require('express');
var exphbs = require('express-handlebars');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
app.engine('hbs', exphbs({
  layoutsDir: 'views/_layouts',
  defaultLayout: 'main.hbs',
}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  // res.end('hello express');
  res.render('home');
})

app.get('/test', (req, res) => {
  // res.end('test page.');
  res.render('test');
})

app.get('/error', (req, res) => {
  res.render('error', {
    layout: false
  });
})

var port = 3000;
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});