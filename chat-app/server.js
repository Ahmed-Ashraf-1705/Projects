var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// users and connections arrays
var users = [];
var connections = [];

// server listening port => 4000
server.listen(process.env.PORT || 4000);
console.log('Server running on port 4000.....');

// decline routes
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

// decline client-side script path
app.use(express.static(__dirname + '/static'));

// open socket connection and bind its events
io.sockets.on('connection',(socket)=>{
    connections.push(socket);
    console.log('Connected...');
    console.log(`Connections: ${connections.length} sockets connected...`);

    // on disconnect
    socket.on('disconnect',(data)=>{
        users.splice(users.indexOf(socket.username),1);
        updateUserNames();
        connections.splice(connections.indexOf(socket),1);
        console.log('Disconnected...');
        console.log(`Connections: ${connections.length} sockets connected...`)
    });

    // on send message
    socket.on('send-message',(data)=>{
        io.sockets.emit('new-message',{msg: data, user: socket.username});
    })

    // on add new user
    socket.on('new-user',(data,callback)=>{
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUserNames();
    });

    function updateUserNames() {
        io.sockets.emit('get-users', users)
    }
});