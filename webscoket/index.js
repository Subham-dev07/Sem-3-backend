const express=require("express");
const connectDB=require("./connect");
const http=require("http");
const {Server}=require("socket.io");
const Chat = require("./chatSchema");

const app=express();
connectDB();
app.use(express.static("public"))
const server=http.createServer(app);


const io=new Server(server);

io.on("connection",(socket)=>{
    console.log("Client Connected",socket.id);
    socket.on("joinRoom",(data)=>{
      socket.join(data)
    })
    socket.on('sendMessage',(data)=>{
        socket.to(data.name).emit('serverReply',data.message)
    })
})
app.get("/message",async (req,res)=>{
   try {
     const chats=await Chat.find();
     res.send(chats)
   } catch (error) {
    console.log(error);
   }
})
server.listen(3000,function(){
    console.log("Server Running at port 3000");
    
})