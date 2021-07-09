const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const usersSchema=new Schema({
    "name":String,
    "email":String,
    "password":String,
    "exp":Schema.Types.Mixed,
    "userimg":String
})

var Users=mongoose.model('users',usersSchema);
module.exports=Users;