var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var config = require('../config/');
var userModel = require('../models/user.model');

var router = express.Router();

router.get('/login', (req, res, next) => {
  res.render('vwAccounts/login', {
    layout: false
  });
})

router.post('/login', (req, res, next) => {
})

router.get('/register', (req, res, next) => {
  res.render('vwAccounts/register');
})

router.post('/register', (req, res, next) => {
  var hash = bcrypt.hashSync(req.body.password, config['authenticate'].saltRounds);
  var dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
  
  var user = {
    f_Username: req.body.username,
    f_Password: hash,
    f_Name: req.body.fullName,
    f_Email: req.body.email,
    f_DOB: dob,
    f_Permission: 0,
  }

  userModel.add(user).then(id => {
    res.redirect('/account/login');
  })
})

router.get('/is-available', (req, res, next) => {
  var user = req.query.user;
  userModel.singleByName(user).then(rows => {
    if (rows.length > 0)
      res.json(false);
    else res.json(true);
  })
})

module.exports = router;
