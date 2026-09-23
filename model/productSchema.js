const mongoose=require('mongoose');



const productSchema=mongoose.Schema({
    name:{type:String,required:true},
    price:{type:String,required:true},
    category:{type:String,required:true},
    brand:{type:String,required:true},
    stock:{type:String,required:true},
    rating:{type:String,required:true}
})

productSchema.pre('save',function(){
    this.stock=this.stock+10
})
productSchema.methods.getExpensive=function(){
    if(this.price>50000) return {expensive:true};
    return {expensive:false};
}

productSchema.statics.getBrand= function(brand){
    return this.find({brand:brand})
}

const Products=mongoose.model('products',productSchema);


module.exports={Products};