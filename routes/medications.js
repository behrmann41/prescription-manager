var express = require('express');
var router = express.Router();
var Medication = require('../lib/medications.js')

router.get('/', function (req, res, next){
  var username = req.session.user
  Medication.find().then(function (medications){
    res.render('medications/index', { title: 'List of Medications', medications: medications, user: username})
  })
})

router.get('/new', function (req, res, next){
  var username = req.session.user
  res.render('medications/new', { title: 'Add a Medication', user: username})
})

router.post('/new', function (req, res, next){
  var errors = []
  Medication.findOne(req.body.name).then(function (medication){
    if (medication){
      errors.push('Medication already in database')
      res.render('medications/new', { title: "Add a Medication", errors: errors})
    } else {
      Medication.insert(req.body.name).then(function(){
        res.redirect('/medications')
      })
    }
  })
})

module.exports = router