
const http=require("http");
const fs=require("fs");
const {WebSocketServer}=require("ws");

const server=http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end(fs.readFileSync("./public/index.html"));
});

const wss=new WebSocketServer({server});
wss.on("connection",(socket)=>{
    socket.on("message",(message)=>{
        wss.clients.forEach((client)=>{
           client.send(message.toString());
        });
    });
});

server.listen(3000,()=>console.log("http://localhost:3000"));



// npx cloudflared tunnel --url http://localhost:3000