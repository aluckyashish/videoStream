var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/mysql');
var validator = require('validator');
var multer = require('multer')
var createError = require('http-errors');
var usersModel = require('../models/users');

// Settings for multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

// Middle ware for Multer
var handleForm = multer({
  storage: storage, limits: 2000000, fileFilter: function (res, file, cb) {
    if (!file.mimetype.includes('image')) {
      return cb(null, false, new Error());
    }
    else {
      cb(null, true);
    }
  }
});
var md5 = require('md5');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Get All Records
router.get('/getdata', function (req, res, next) {
  // mysqlConnection.query('select * from users order by id desc', (err, data) => {
  //   if (err) { throw (err) }
  //   res.render('user', { data });
  // })

  usersModel.find({}, (err, data) => {
    if (err) throw err;
    res.render('user', { data })

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
router.post('/postdata', handleForm.single('userfile'), function (req, res, next) {
  if (req.file) {
    let checkEmail = validator.isEmail(req.body.useremail);
    let checkname = validator.isEmpty(req.body.username);
    if (!checkEmail || checkname) { res.send({ "status": "fail" }); return }
    var insertData = { "username": req.body.username, "useremail": req.body.useremail, "userpwd": md5(req.body.userpwd), userimg: req.file.filename };

    const user = new usersModel({
      "name": req.body.username,
      "email": req.body.useremail,
      "password": md5(req.body.userpwd),
      "exp": [{ "name": "test" }, { "name": "test2" }],
      "userimg":req.file.filename
  });
  user.save((err,res1) => {
if(err) throw err;
    res.send("done")
  })
    // mysqlConnection.query('insert into users SET ?', insertData, (err, data) => {
    //   if (err) { throw (err) }
    //   res.send("done")
    // })


  } else {
    next(createError(410, 'File Not Supported'));
  }
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
