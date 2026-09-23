
const express=require("express");
const connect = require("./connect");
const {Products} = require("./model/productSchema");
const { default: mongoose } = require("mongoose");
const User = require("./model/userSchema");
const app=express();
connect()
app.use(express.json())


app.get('/',function(req,res){
    res.send("welcome to Home Page")
})


app.get("/products",async function(req,res){
   const product=await Products.getBrand('Apple')
   res.send(product)
})

app.post("/products",async function(req,res){
    const newProduct=new Products(req.body);
    await newProduct.save()
})



app.listen(3000,()=>{
    console.log('our backend is running at port',3000);
})