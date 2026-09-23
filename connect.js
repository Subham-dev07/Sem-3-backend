const mongoose=require('mongoose')

function connect(){
    mongoose.connect('URL')
  .then(() => console.log('Connected To DB!'));
}
module.exports=connect