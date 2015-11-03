var express = require('express');
var router = express.Router();
var Patient = require('../lib/patients.js')
var Appointment = require('../lib/appointments.js')
var User = require('../lib/users.js')



/* GET home page. */
router.get('/', function(req, res, next) {
  var username = req.session.user
  res.render('index', { title: 'Prescription Manager', user: username });
});

router.get('/home', function (req, res, next){
  var username = req.session.user
  var email = req.session.email
  User.findOneEmail(email).then(function (user){
    return Appointment.find(user._id).then(function (appointments){
      var result = {}
      result['user'] = user
      result['appointments'] = appointments
      result['patients'] = []
      return result
    })
    .then(function (result){
      var promises = result.appointments.map(function (patient){
        return Patient.findById(patient.patientId).then(function (patient){
          return result.patients.push(patient)
        })
      })
      Promise.all(promises).then(function(results){
        res.render('index', { title: 'Prescription Manager', user: username, allPatients: result.patients})
      })
    })
  })
})

module.exports = router;
