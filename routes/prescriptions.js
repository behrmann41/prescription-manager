var express = require('express')
var router = express.Router()
var Patient = require('../lib/patients.js')
var Prescription = require('../lib/prescriptions.js')

router.post('/new', function (req, res, next){
  var errors = []
  if (!req.body.medication.trim()){
    errors.push('Need to select a Medication')
  }
  if (!req.body.doctor.trim()){
    errors.push('Need to select a Doctor')
  }
  if (!req.body.date.trim()){
    errors.push('Need to select a date')
  }
  if (errors.length){
    var username = req.session.user
    Patient.findOne(req.params.id).then(function (patient){
      res.render('patients/show', { title: "Patient Info", user: username, patient: patient, errors: errors})
    })
  } else {
    Prescription.insert(req.body).then(function (prescription){
      res.json(prescription)
    })
  }
})

router.get('/data', function (req, res, next){
  Prescription.find().then(function (prescriptions){
    res.json(prescriptions)
  })
})

module.exports = router