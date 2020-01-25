var express = require('express');
var app = express();

var ip = require('ip');

var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var _ = require('lodash');


// users and connections arrays
var users = {};
var noOfUsers = 0;

// server listening port => 4000
server.listen(process.env.PORT || 4000);
console.log(`Server running on http://${ip.address()}:4000 .....`);

// decline routes
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

// decline client-side script path
app.use(express.static(__dirname + '/static'));

// open socket connection and bind its events
io.sockets.on('connection',(socket)=>{

    console.log('Connected...');
    noOfUsers++;
    console.log(`Connections: ${noOfUsers} sockets connected...`);
    console.log(`P: ${socket.conn.remoteAddress}:${socket.request.connection.remotePort}`)

    // on disconnect
    socket.on('disconnect',(data)=>{
        delete users[socket.username];
        updateUserNames();
        console.log('Disconnected...');
        noOfUsers--;
        console.log(`Connections: ${noOfUsers} sockets connected...`)
    });

    // on send message -multicasting-
    socket.on('send-message',(data,callback)=>{


    var msg = data.trim();
    if(msg.substr(0,3) === '/w '){
        // private chatting -unicasting-

        msg = msg.substr(3);
        var index = msg.indexOf(' ');
        if (index != -1){
            var name = msg.substr(0,index);
            var msg = msg.substring(index + 1);
            if (name in users){
                console.log('whispered!');
                users[name].emit('whisper',{msg: msg, user: socket.username});

            }
        } else {
            callback('Error! message cant be empty.');
        }

    }else {
        if (msg != ''){
        io.sockets.emit('new-message',{msg: data, user: socket.username});
      } else {
        callback('Error! message cant be empty.');
      }

    }

    })

    // on add new user
    socket.on('new-user',(data,callback)=>{
        if (data in users){
            callback(false)
        } else {
            callback(true);
            socket.username = data;
            users[socket.username] = socket

            updateUserNames();
        }

    });




    function updateUserNames() {
        io.sockets.emit('get-users', Object.keys(users))
    }
});
