

const mongoose=require('mongoose');



const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    balance:{type:Number,required:true}
})

const User=mongoose.model('users',userSchema);
module.exports=User