var express = require('express');
var createError = require('http-errors');
var router = express.Router();
var fs = require('fs');
var path = require('path');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });


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
