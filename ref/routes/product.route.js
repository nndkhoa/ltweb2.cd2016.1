var express = require('express');

var productModel = require('../models/product.model');
var { setActiveCategory } = require('../utils/locals.helper');

var router = express.Router();

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
