var express = require('express');
var router = express.Router();
var User = require('../lib/users.js')
var bcrypt = require('bcrypt')



router.get('/register', function (req, res, next){
  res.render('users/register', {  title: 'Create an account'})
})

router.post('/register', function (req, res, next){
  var errors = [];
  var hash = bcrypt.hashSync(req.body.password, 10)
  if (!req.body.username.trim()){
    errors.push('Please enter a username')
  }
  if (!req.body.email.trim()){
    errors.push('Please enter an email')
  }
  if (!req.body.password.trim()){
    errors.push('Please enter a password')
  }
  if (req.body.password.length < 8){
    errors.push('Password needs to be at least 8 characters')
  }
  if (!req.body.email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i)){
    errors.push('Invalid Email')
  }
  if (req.body.password !== req.body.pwconfirm){
    errors.push('Passwords need to match')
  }
  if (errors.length){
    res.render('users/register', {  title: "Create an Account", errors: errors})
  } else {
    User.findEmail(req.body.email).then(function (user){
      if (user.length > 0){
        errors.push('Email already in use');
        res.render('users/register', {  title: 'Create an account', errors: errors})
      } else {
        User.insert(req.body.username,req.body.email,hash)
        req.session.user = req.body.username
        res.redirect('/home')
      }
    })
  }
})

router.get('/login', function (req, res, next){
  res.render('users/login', { title: 'Login'})
})

router.post('/login', function (req, res, next){
  var errors = [];
  User.findOneEmail(req.body.email).then(function (user){
    if (user){
      if (bcrypt.compareSync(req.body.password, user.passwordDigest)){
        req.session.user = user.username
        res.redirect('/home')
      } else {
        errors.push('Invalid Email / Password')
        res.render('users/login', {  title: 'Login', errors: errors})
      }
    } else {
      errors.push('Invalid Email / Password')
      res.render('users/login', {  title: 'Login', errors: errors})
    }
  })
})

router.get('/logout', function (req, res, next){
  req.session = null
  res.redirect('/')
})

module.exports = router;