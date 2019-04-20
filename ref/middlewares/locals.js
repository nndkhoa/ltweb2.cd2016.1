var LRU = require('lru-cache');
var categoryModel = require('../models/category.model');

var cache = new LRU({
  max: 500,
  maxAge: 1000 * 60, // ms
  // length: (item, key) => 1,
  // dispose: (key, item) => item.close(),
})

var middlewares = [

  (req, res, next) => {
    var data = cache.get('globalCategories');
    if (!data) {
      console.log('-- fetch `globalCategories`');
      categoryModel.allWithDetails().then(rows => {
        cache.set('globalCategories', rows);
        res.locals.lcCategories = rows;
        next();
      }).catch(next);
    } else {
      console.log('-- cache hit for `globalCategories`');
      data.map(c => {
        delete c.isActive;
      });
      res.locals.lcCategories = data;
      next();
    }
  },

  (req, res, next) => {
    if (req.user) {
      res.locals.isAuthenticated = true;
      res.locals.authUser = req.user;
    }
    next();
  }
];

// var loadCategories = (req, res, next) => {
//   categoryModel.allWithDetails().then(rows => {
//     res.locals.lcCategories = rows;
//     next();
//   }).catch(next);
// }

// var auth = (req, res, next) => {
//   if (req.user) {
//     res.locals.isAuthenticated = true;
//     res.locals.authUser = req.user;
//   }

//   next();
// }

module.exports = app => {
  // app.use(auth);
  // app.use(loadCategories);
  middlewares.map(fn => app.use(fn));
};
