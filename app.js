const express = require("express");
const path = require("path")
const app  = express();
const PORT = 8000;
const server = app.listen(PORT ,()=>{console.log("app started at port 8000")});
const io = require('socket.io')(server);
app.use(express.static(path.join(__dirname , 'public')))

let socketsConnected = new Set()
io.on('connection' ,onConnection)

function onConnection(socket){
console.log(socket.id)
socketsConnected.add(socket.id);

io.emit('clients-total' , socketsConnected.size)


socket.on('disconnect' , ()=>{
    console.log('socket disconnected' , socket.id)
    socketsConnected.delete(socket.id)
    io.emit('clients-total' , socketsConnected.size)
})


    socket.on('message', (data) => {
        console.log(data);
    
        socket.broadcast.emit('chat-message', data);
    
        console.log("Message broadcasted");
    });

}