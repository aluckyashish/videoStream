var express = require('express');
var createError = require('http-errors');
var router = express.Router();
var fs = require('fs');
var path = require('path');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });


});

// Read File
router.get('/getfile', function (req, res, next) {
  var data = fs.readFileSync('public/demo.txt');
  res.render('getdata', { data })
});


// Write File
router.get('/writefile', function (req, res, next) {

  var data = fs.writeFile('public/test.txt', 'Hello This is HCL', (err, data) => {
    console.log("Writing Done")
  });
});


// Append Data
// Write File
router.get('/appendfile', function (req, res, next) {

  var data = fs.appendFile('public/test.txt', '<br/>Today is friday', (err, data) => {
    console.log("Append  Done")
  });
});

// Unlink or delete File
router.get('/delfile', function (req, res, next) {
  fs.unlink('public/test.txt', (err, data) => {
    console.log("Delete  Done")
  });
});

// Show Video
router.get('/showVideo', function (req, res, next) {
  res.render('video');
});


// Play Video
router.get('/playvideo', function (req, res, next) {

  const filepath = path.resolve('public/video/video.mp4');
  const stat = fs.statSync(filepath);
  const filesize = stat.size;
  const range = req.headers.range;
  if (range) {
    const fparts = range.replace(/bytes=/, "");
    parts = fparts.split("-");
    const start = parseInt(parts[0],10);
    const end = parts[1] ? parseInt(parts[1],10) : filesize-1;
    const chunksize = (end - start) + 1;
    const file=fs.createReadStream(filepath,{start,end})
    const head={
      'Content-Range':`bytes ${start}-${end}/${filesize}`,
      'Accept-Ranges':'bytes',
      'Content-Length':chunksize,
      'Content-Type':'video/mp4'
    }
    res.writeHead(206,head);
    file.pipe(res);
}
else{
  const head={
    'Content-Length':filesize,
    'Content-Type':'video/mp4'
  }
  res.writeHead(200,head);
  fs.createReadStream(filepath).pipe(res);
}

});



router.post('/submitForm', function (req, res, next) {
  console.log(req.body.name)
  res.send({ title: 'Express', Name: req.body.name });


});


module.exports = router;
