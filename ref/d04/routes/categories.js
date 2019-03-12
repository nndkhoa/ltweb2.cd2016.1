const express = require('express');
const categoryModel = require('../models/category');

const router = express.Router();

router.get('/', (req, res, next) => {
  categoryModel.all().then(rows => {
    res.render('category/index', {
      categories: rows
    });
  }).catch(err => next(err));
})

module.exports = router;
