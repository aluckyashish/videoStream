const mongoose=require('mongoose');
var config=require('./config');
mongoose.connect('mongodb://127.0.0.1:27017/myapp',
config.mongo,()=>{

    console.log("====Connection Done==")
}
)

module.exports=mongoose;