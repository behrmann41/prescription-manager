var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var username = req.session.user
  res.render('index', { title: 'Prescription Manager', user: username });
});

module.exports = router;
