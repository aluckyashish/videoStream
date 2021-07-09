var express = require('express');
var router = express.Router();
var mysqlConnection = require('../config/mysql');
var usersModel = require('../models/users');
var createError = require('http-errors');

router.get('/newuser', () => {

    // const user = new usersModel({
    //     "name": "Ashish",
    //     "email": "ashish@gail.com",
    //     "password": "wertyu",
    //     "exp": [{ "name": "test" }, { "name": "test2" }]
    // });
    // user.save(() => {

    //     console.log("Insert Done");
    // })

    usersModel.insertMany([{
        "name": "Test1",
        "email": "ashish@gail.com",
        "password": "wertyu",
        "exp": [{ "name": "test1" }, { "name": "test2" }]
    }, {
        "name": "Test2",
        "email": "ashish@gail.com",
        "password": "wertyu",
        "exp": [{ "name": "test1" }, { "name": "test2" }]
    }, {
        "name": "Test3",
        "email": "ashish@gail.com",
        "password": "wertyu",
        "exp": [{ "name": "test1" }, { "name": "test2" }]
    }], () => {
        console.log("Insert Done");
    })

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
module.exports = router;
