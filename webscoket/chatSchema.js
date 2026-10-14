
const mongoose=require('mongoose');


const chatSchema=mongoose.Schema({
    name:{type:String,required:true},
    message:{type:String,required:true}
})

const Chat=mongoose.model('chatHistory',chatSchema);
module.exports=Chat;