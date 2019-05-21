var express = require('express');

var categoryModel = require('../models/category.model');
var productModel = require('../models/product.model');
var { setActiveCategory } = require('../utils/locals.helper');

var router = express.Router();

router.get('/add', (req, res, next) => {
  categoryModel.all().then(rows => {
    // const icons = [
    //   'fa-book',
    //   'fa-phone',
    //   'fa-camera',
    //   'fa-female',
    //   'fa-desktop',
    //   'fa-diamond',
    //   'fa-hashtag',
    // ];

    // for (i = 0; i < icons.length; i++) {
    //   rows[i].CatIcon = icons[i];
    // }

    res.render('vwProducts/add', {
      categories: rows
    });
  })
})

router.post('/add', (req, res, next) => {
  productModel.add(req.body).then(id => {
    res.render('vwProducts/add');
  }).catch(next);
})

router.get('/:id', (req, res, next) => {
  const viewName = 'vwProducts/detail';
  var vm = {
    error: true
  }

  var id = req.params.id;
  if (isNaN(id)) {
    res.render(viewName, vm);
    return;
  }

  productModel.single(id)
    .then(rows => {
      if (rows.length > 0) {

        setActiveCategory(res.locals.lcCategories, rows[0].CatID);

        vm = {
          error: false,
          product: rows[0]
        }
      }

      res.render(viewName, vm);
    })
    .catch(next);
})

module.exports = router;
