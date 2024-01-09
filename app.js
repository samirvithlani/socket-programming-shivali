const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const {Server} = require('socket.io');
const path = require('path');

const io = new Server(server);

//socket server..

io.on("connection",(socket)=>{
    console.log("A new User Connected..",socket.id);
    io.emit("user_connected",socket.id);
    socket.on("user_message",(message)=>{
        console.log(message);
        //socket.broadcast.emit("user_message",message);
        io.emit("user_message",message);
    })
})

app.use(express.static(path.resolve("./public")));
app.get("/",(req,res)=>{
    return res.sendFile("index.html");
})


server.listen(3000, () => {
    console.log('listening on *:3000');
})
