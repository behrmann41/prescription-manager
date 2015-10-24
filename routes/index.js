var express = require('express');
var router = express.Router();
var Patient = require('../lib/patients.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  var username = req.session.user
  res.render('index', { title: 'Prescription Manager', user: username });
});

router.get('/home', function (req, res, next){
  var username = req.session.user
  Patient.find().then(function (patients){
    res.render('index', { title: 'Prescription Manager', user: username, allPatients: patients })
  })
})

module.exports = router;
