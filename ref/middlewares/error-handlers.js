var createError = require('http-errors');

module.exports = app => {
  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use((err, req, res, next) => {
    let errorView = 'error';
    const status = err.status || 500;

    if (status === 404) {
      errorView = '404';
    }

    var isProd = app.get('env') === 'prod';
    var message = isProd ? 'An error has occured. Please contact administrator for more support.' : err.message;
    var error = isProd ? {} : err;

    res.status(status).render(errorView, {
      layout: false,
      message,
      error
    });
  });
};
