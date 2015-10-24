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

router.get('/:id', function (req, res, next){
  var username = req.session.user
  Patient.findOne(req.params.id).then(function (patient){
    res.render('patients/show', { title: "Patient Info", user: username, patient: patient})
  })
})

module.exports = router;