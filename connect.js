const mongoose=require('mongoose')

function connect(){
    mongoose.connect('')
  .then(() => console.log('Connected To DB!'));
}
module.exports=connect