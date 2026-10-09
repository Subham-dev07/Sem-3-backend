const express = require("express");
const fs=require("fs")
const statusMonitor = require('express-status-monitor');
const {Transform}=require("stream");

const app = express();

app.use(statusMonitor());
app.use(express.json());


app.get("/",(req,res)=>{
  fs.readFile("./stream/largeFile.txt","utf-8",function(err,data){
    res.send(data)
  })
})

app.get("/read",(req,res)=>{
  const readStream=fs.createReadStream("./stream/largeFile.txt")
  readStream.on("data",(chunk)=>{
    res.write(chunk)
  })
  readStream.on("end",()=>{
    console.log("file reading completed");
    res.end()
  })
 
})
app.get("/write",(req,res)=>{
  const writeStream=fs.createWriteStream("./stream/log.txt");
  writeStream.write("server Started\n")
  writeStream.write("user logged In\n")
  writeStream.write("user made payment\n")
  writeStream.write("user logged out\n");
  writeStream.end();
  writeStream.on("finish",()=>{
    console.log("log file writing completed");
  })
})


app.get("/pipe",(req,res)=>{
    const readStream=fs.createReadStream("./stream/db.txt")
    const writeStream=fs.createWriteStream("./stream/server.txt");
    readStream.pipe(writeStream)
})




app.listen(3000, function () {
  console.log("Server running on port 3000");
});
