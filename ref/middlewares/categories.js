var categoryModel = require('../models/category.model');

module.exports = (req, res, next) => {
  categoryModel.allWithDetails().then(rows => {
    res.locals.lcCategories = rows;
    next();
  }).catch(next);
}