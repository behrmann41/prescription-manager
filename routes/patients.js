var express = require('express')
var router = express.Router()
var Patient = require('../lib/patients.js')

router.get('/new', function (req, res, next){
  var username = req.session.user
  res.render('patients/new', {  title: "Add new patient", user: username  })
})

router.post('/new', function (req, res, next){
  var username = req.session.user
  var errors = [];
  if (!req.body.firstname.trim()){
    errors.push("Please Enter a First Name")
  }
  if (!req.body.lastname.trim()){
    errors.push("Please Enter a Last Name")
  }
  if (!req.body.birthday.trim()){
    errors.push("Please Enter a Date of Birth")
  }
  if (errors.length){
    res.render('patients/new', {  title: "Add new patient", user: username, errors: errors  })
  } else {
    Patient.insert(req.body.firstname, req.body.lastname, req.body.birthday)
    res.redirect('/home')
  }
})

module.exports = router;