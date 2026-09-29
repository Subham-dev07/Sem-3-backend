const mongoose=require('mongoose');
const createBookingSchema = require('./model/bookingSchema');

function connect(){
    mongoose.connect('mongodb://localhost:27017/mydb')
  .then(() => {
    console.log('Connected To DB!')
    createBookingSchema()
});
}
module.exports=connect