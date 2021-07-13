var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var mysqlConnection = require('../config/mysql');
var usersModel = require('../models/users');
var createError = require('http-errors');
const bcrypt = require('bcrypt');
const auth = require('../auth');
const saltRounds = 10;
var multer = require('multer');


router.post('/newuser', multer().none(), async (req, res) => {

    let password = req.body.userpwd
    let haspwd = await bcrypt.hash(password, saltRounds);
    const user = new usersModel({
        "name": req.body.username,
        "email": req.body.useremail,
        "password": haspwd,
        "exp": [{ "name": "test" }, { "name": "test2" }]
    });
    user.save(() => {

        console.log("Insert Done");
        res.send("login works");
    })

    // usersModel.insertMany([{
    //     "name": "Test1",
    //     "email": "ashish@gail.com",
    //     "password": "wertyu",
    //     "exp": [{ "name": "test1" }, { "name": "test2" }]
    // }, {
    //     "name": "Test2",
    //     "email": "ashish@gail.com",
    //     "password": "wertyu",
    //     "exp": [{ "name": "test1" }, { "name": "test2" }]
    // }, {
    //     "name": "Test3",
    //     "email": "ashish@gail.com",
    //     "password": "wertyu",
    //     "exp": [{ "name": "test1" }, { "name": "test2" }]
    // }], () => {
    //     console.log("Insert Done");
    // })

})


router.get('/getuser', () => {

    usersModel.find({ "name": "Ashish" }, (err, res) => {
        if (err) throw err;
        console.log("Data is ", res)

    })

})

router.get('/updateuser', () => {

    usersModel.updateMany({ "name": "Ashish" }, { $set: { name: "Ram" } }, (err, res) => {
        if (err) throw err;
        console.log("Data is Updated ")

    })

})

router.get('/deleteuser', () => {
    usersModel.remove({ "name": "Ram" }, (err, res) => {
        if (err) throw err;
        console.log("Data is Deleted ")

    })

})

router.get('/deleteuser', () => {
    usersModel.remove({ "name": "Ram" }, (err, res) => {
        if (err) throw err;
        console.log("Data is Deleted ")

    })

})


router.post('/loginUser', multer().none(), async (req, res) => {

    let user = await usersModel.findOne({ "name": req.body.username });

    if (!user) {
        res.send("User not exist");
        return
    }
    let resultCompare = await bcrypt.compare(req.body.userpwd, user.password);
    if (resultCompare) {
        var token = await jwt.sign({ _id: user._id.toString() }, process.env.SECRET_TOKEN);
        res.cookie('token', token);

      //  req.session.userData=user
        res.send({ user, token })
    }
    else {
        res.status(300).send("Password not matched")
    }
    // Basic for Bcrypt

    // let password = 'ashish';
    // let haspwd = await bcrypt.hash(password, saltRounds);
    // let resultCompare = await bcrypt.compare(req.body.password, haspwd);
    // console.log("resultCompare", resultCompare)
    // console.log("has", haspwd)

    // Login 


})

// logout 

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/mongo/login')


})

router.get('/login', (req, res) => {
    res.render('login')
})


router.get('/profile', auth, (req, res) => {
console.log(req.usrData);
let id=req.usrData;

usersModel.find({_id:id},(req1,res1)=>{
    res.send({"res":res1})
})
 //   let usr=req.session.userData
   
})


module.exports = router;
