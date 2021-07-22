var express = require('express');
var createError = require('http-errors');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var S3 = require('aws-sdk/clients/s3');
var AWS = require('aws-sdk/global');
AWS.config.update(
  {
    "accessKeyId": "AKIASDXXGMKKRMWCQGOJ",
    "secretAccessKey": "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",
    "region": "ap-southeast-1"
  }
);
const s3 = new AWS.S3();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });


});

// Play Video
router.get('/playvideo', function (req, res, next) {

  AWS.config.getCredentials(function (err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
      console.log("Access key:", AWS.config.credentials.accessKeyId);
  
      var params = { Bucket: 'genentech-training-video', Key: 'video.mp4' };
      
      var url = s3.getSignedUrl('getObject', params);

      res.render('video',{url})
    }
  });


});

// basic of write stream
router.get('/write', function (req, res, next) {
 let writer= fs.createWriteStream("test.txt");
//   let reader=fs.createReadStream('public/video/video.mp4')
//  reader.pipe(writer)
 

});


//bascic of events 
router.get('/nwrite', function (req, res, next) {
 let writer= fs.createWriteStream("test.txt");
 writer.on('open',()=>{

  console.log('fie is open')
 })
//   let reader=fs.createReadStream('public/video/video.mp4')
//  reader.pipe(writer)
 

});

router.post('/submitForm', function (req, res, next) {
  console.log(req.body.name)
  res.send({ title: 'Express', Name: req.body.name });


});


module.exports = router;
