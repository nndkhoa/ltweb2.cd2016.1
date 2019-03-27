var express = require('express');
var categoryModel = require('../models/category.model');

var router = express.Router();

router.get('/', (req, res) => {
  categoryModel.all()
    .then(rows => {
      res.render('vwCategories/index', {
        categories: rows
      });
    })
    .catch(error => {
      res.render('error', { layout: false });
    });
})

router.get('/add', (req, res) => {
  res.render('vwCategories/add');
})

router.post('/add', (req, res) => {
  categoryModel.add(req.body).then(id => {
    res.render('vwCategories/add');
  });
})

router.get('/edit/:id', (req, res) => {
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
    });
})

router.post('/update', (req, res) => {
  categoryModel.update(req.body).then(n => {
    res.redirect('/categories');
  });
})

module.exports = router;
