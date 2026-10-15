const mongoose=require('mongoose');


const chatSchema=mongoose.Schema({
    name:String,
    message:String
})
const Chat=mongoose.model('chatHistory',chatSchema);
module.exports=Chat;