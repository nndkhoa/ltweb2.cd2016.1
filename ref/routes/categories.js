var express = require('express');
var categoryModel = require('../models/category.model');

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
  var id = req.params.id;
  if (isNaN(id)) {
    res.render('vwCategories/edit', { error: true });
    return;
  }

  categoryModel.single(id)
    .then(rows => {
      if (rows.length > 0) {
        res.render('vwCategories/edit', {
          error: false,
          category: rows[0]
        });
      } else {
        res.render('vwCategories/edit', {
          error: true
        });
      }
    })
    .catch(next);
})

router.post('/update', (req, res, next) => {
  categoryModel.update(req.body).then(n => {
    res.redirect('/categories');
  }).catch(next);
})

module.exports = router;
