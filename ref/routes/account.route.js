var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport = require('passport');

var config = require('../config/');
var userModel = require('../models/user.model');
var auth = require('../middlewares/auth');

var router = express.Router();

router.get('/login', (req, res, next) => {
  if (req.user) {
    return res.redirect('/');
  }

  res.render('vwAccounts/login', {
    layout: false
  });
})

// router.post(
//   '/login',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/account/logIn',
//   })
// )

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.render('vwAccounts/login', {
        layout: false,
        err_message: info.message
      });
    }

    const retUrl = req.query.retUrl || '/';
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res.redirect(retUrl);
    });

  })(req, res, next);
})

router.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/account/login');
})

router.get('/register', (req, res, next) => {
  if (req.user) {
    return res.redirect('/');
  }
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
  userModel.singleByUserName(user).then(rows => {
    if (rows.length > 0)
      res.json(false);
    else res.json(true);
  })
})

router.get('/profile', auth, (req, res, next) => {
  res.end('PROFILE');
})

module.exports = router;