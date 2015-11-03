var express = require('express')
var router = express.Router()
var Patient = require('../lib/patients.js')
var Prescription = require('../lib/prescriptions.js')
var Medication = require('../lib/medications.js')
var User = require('../lib/users.js')

router.post('/', function (req, res, next){
  var errors = []
  if (!req.body.medicationId.trim()){
    errors.push('Need to select a Medication')
  }
  if (!req.body.userId.trim()){
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
    var input = {}
    var medId = Medication.id(req.body.medicationId)
    var docId = User.id(req.body.userId)
    var patId = Patient.id(req.body.patientId)
    input["medicationId"] = medId
    input["userId"] = docId
    input["patientId"] = patId
    input["date"] = req.body.date
    Prescription.insert(input).then(function (prescription){
      res.json(prescription)
    })
  }
})

module.exports = router