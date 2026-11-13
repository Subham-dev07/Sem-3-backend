
const http=require("http");
const fs=require("fs");
const path=require("path");
const {WebSocketServer,WebSocket}=require("ws");

const PUBLIC_DIR=path.join(__dirname,"public");

const server=http.createServer((req,res)=>{
 
    const filePath=path.join(PUBLIC_DIR,req.url==="/"?"index.html":req.url);

    fs.readFile(filePath,(err,data)=>{
        if(err){
            res.writeHead(404);
            return res.end("Not found");
        }
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(data);
    });
});

const wss=new WebSocketServer({server});
wss.on("connection",(socket)=>{
    socket.on("message",(message)=>{
        wss.clients.forEach((client)=>{
            if(client!==socket && client.readyState===WebSocket.OPEN){
                client.send(message.toString());
            }
        });
    });
});

server.listen(3000,()=>console.log("http://localhost:3000"));
