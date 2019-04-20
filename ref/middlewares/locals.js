var categoryModel = require('../models/category.model');

var localsMdws = [

  loadCategories = (req, res, next) => {
    categoryModel.allWithDetails().then(rows => {
      res.locals.lcCategories = rows;
      next();
    }).catch(next);
  },

  auth = (req, res, next) => {
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
  localsMdws.map(fn => app.use(fn));
};
