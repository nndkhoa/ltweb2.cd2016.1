var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);
require('./middlewares/locals')(app);
require('./middlewares/routes')(app);
require('./middlewares/upload')(app);

app.get('/', (req, res) => {
  res.render('home');
})

require('./middlewares/error-handlers')(app);

var port = process.env.PORT || 3000;
app.listen(port, () => {
  var env = app.get('env');
  console.log(`server is running in ${env} mode at http://localhost:${port}`);
});