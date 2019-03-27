var express = require('express');

var categoryModel = require('../models/category.model');
var productModel = require('../models/product.model');

var router = express.Router();

router.get('/', (req, res, next) => {
  categoryModel.all()
    .then(rows => {
      res.render('vwCategories/index', {
        categories: rows
      });
    })
    .catch(next);
})

router.get('/add', (req, res, next) => {
  res.render('vwCategories/add');
})

router.post('/add', (req, res, next) => {
  categoryModel.add(req.body).then(id => {
    res.render('vwCategories/add');
  }).catch(next);
})

router.get('/edit/:id', (req, res, next) => {
  var vm = {
    error: true
  }

  var id = req.params.id;
  if (isNaN(id)) {
    res.render('vwCategories/edit', vm);
    return;
  }

  categoryModel.single(id)
    .then(rows => {
      if (rows.length > 0) {
        vm = {
          error: false,
          category: rows[0]
        }
      }

      res.render('vwCategories/edit', vm);
    })
    .catch(next);
})

router.post('/update', (req, res, next) => {
  categoryModel.update(req.body).then(n => {
    res.redirect('/categories');
  }).catch(next);
})

router.get('/:id/products', (req, res, next) => {
  var vm = {
    error: true
  }

  var id = req.params.id;
  if (isNaN(id)) {
    res.render('vwProducts/byCat', vm);
    return;
  }

  productModel.allByCat(id)
    .then(rows => {

      res.locals.lcCategories.map(c => {
        if (c.CatID === +id)
          c.isActive = true;

        return c;
      });

      vm = {
        error: false,
        empty: rows.length === 0,
        products: rows
      }
      res.render('vwProducts/byCat', vm);
    })
    .catch(next);
})

module.exports = router;
