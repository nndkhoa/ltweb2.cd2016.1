var express = require('express');

var config = require('../config/');
var categoryModel = require('../models/category.model');
var productModel = require('../models/product.model');
var { setActiveCategory } = require('../utils/locals.helper');
var buildPgSettings = require('../utils/pagination.helper');

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

router.post('/delete', (req, res, next) => {
  categoryModel.delete(+req.body.CatID).then(n => {
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

  var limit = config['paginate'].default;
  var page = req.query.page || 1;
  if (page < 1) page = 1;
  var offset = (page - 1) * limit;

  Promise.all([
    productModel.pageByCat(id, offset),
    productModel.countByCat(id)
  ]).then(([rows, count_rows]) => {

    setActiveCategory(res.locals.lcCategories, +id);
    var pgSettings = buildPgSettings(+page, count_rows[0].total);
    console.log(pgSettings);

    vm = {
      error: false,
      empty: rows.length === 0,
      products: rows,
      pgSettings
    }
    res.render('vwProducts/byCat', vm);
  }).catch(next);
})

// router.get('/:id/products', (req, res, next) => {
//   var vm = {
//     error: true
//   }

//   var id = req.params.id;
//   if (isNaN(id)) {
//     res.render('vwProducts/byCat', vm);
//     return;
//   }

//   productModel.allByCat(id)
//     .then(rows => {

//       setActiveCategory(res.locals.lcCategories, +id);

//       vm = {
//         error: false,
//         empty: rows.length === 0,
//         products: rows
//       }
//       res.render('vwProducts/byCat', vm);
//     })
//     .catch(next);
// })

module.exports = router;
