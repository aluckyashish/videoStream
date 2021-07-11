var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var mysqlConnection = require('../config/mysql');
var usersModel = require('../models/users');
var createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/newuser', async (req, res) => {
    let password = 'ashish123';
    let haspwd = await bcrypt.hash(password, saltRounds);
    const user = new usersModel({
        "name": "ashish",
        "email": "ashish@gail.com",
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


router.post('/login', async (req, res) => {

    let user = await usersModel.findOne({ "name": req.body.user });

    if (!user) {
        res.send("User not exist");
        return
    }

    let resultCompare = await bcrypt.compare(req.body.password, user.password);
    if (resultCompare) {
        var token=await jwt.sign({_id:user._id.toString()},process.env.SECRET_TOKEN)
        res.send({user,token})
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


router.get('/profile',()=>{

    res.send("profile page")
})
module.exports = router;
