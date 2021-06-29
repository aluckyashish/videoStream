var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/mysql');
var validator = require('validator');

var md5 = require('md5');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Get All Records
router.get('/getdata', function (req, res, next) {
  mysqlConnection.query('select * from users order by id desc', (err, data) => {
    if (err) { throw (err) }
    res.render('user', { data });
  })
});


// User Actions 
router.get('/useraction/:type', function (req, res, next) {
  if (req.params.type == "new") {
    res.render('useraction', { data: '', pageType: 'new' });
  } else {
    mysqlConnection.query('select * from users where id=?', req.params.type, (err, data) => {
      if (err) { throw (err) }
      res.render('useraction', { data: data[0], pageType: 'update' });
    })
  }
});


// Insert Records
router.post('/postdata', function (req, res, next) {
  let checkEmail = validator.isEmail(req.body.email);
  let checkname = validator.isEmpty(req.body.name);
  if (!checkEmail || checkname) { res.send({ "status": "fail" }); return }
  var insertData = { "username": req.body.name, "useremail": req.body.email, "userpwd": md5(req.body.pwd) };
  mysqlConnection.query('insert into users SET ?', insertData, (err, data) => {
    if (err) { throw (err) }
    res.send("done")
  })

});

// Delete Records
router.delete('/deletedata/:id', function (req, res, next) {
  mysqlConnection.query('delete from users where id=?', req.params.id, (err, data) => {
    if (err) { throw (err) }
    res.send("done")
  })

});


// Update Records
router.put('/updatedata/:id', function (req, res, next) {
  let checkEmail = validator.isEmail(req.body.email);
  let checkname = validator.isEmpty(req.body.name);
  if (!checkEmail || checkname) { res.send({ "status": "fail" }); return }
  var insertData = { "username": req.body.name, "useremail": req.body.email };
  mysqlConnection.query('update users SET ? where id=?', [insertData, req.params.id], (err, data) => {
    if (err) { throw (err) }
    res.send("done")
  })

});
module.exports = router;
