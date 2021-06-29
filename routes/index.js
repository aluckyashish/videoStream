var express = require('express');
var createError = require('http-errors');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });


});
router.post('/submitForm', function (req, res, next) {
  console.log(req.body.name)
  res.send({ title: 'Express',Name: req.body.name });


});


module.exports = router;
