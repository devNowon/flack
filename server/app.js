//var WebSocketServer = require("ws").Server
var http = require("http");
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static("../app/"));

var server = http.createServer(app);

var io = require('socket.io')(server);

server.listen(port);

console.log("http server listening on %d", port);

var rooms = [];
io.on('connection', function(socket){
  console.log('a user connected');

  var roomID = 'global';
  socket.join(roomID);

  socket.on('joinRoom', function(data){
    roomID = data;
    socket.join(roomID);
    console.log('JOIN ROOM LIST', io.sockets.adapter.rooms);
  });

  socket.on('leaveRoom', function(data){
    socket.leave(roomID);
    roomID = 'global';
    console.log('OUT ROOM LIST', io.sockets.adapter.rooms);
  });

  socket.on('roomInformation', function(){
    console.log('gro')
    io.emit('roomInformation', io.sockets.adapter.rooms);
  });

  socket.on('sendMessage', function(data){
    io.sockets.in(roomID).emit('receiveMessage', data);
  });

  socket.on('typing', function(bool){
    io.emit('typing', bool)
  });
});