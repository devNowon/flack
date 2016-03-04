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

  var roomId;
  socket.on('joinRoom', function(data){
    roomId = data;
    socket.join(roomId);
    console.log('JOIN ROOM LIST', io.sockets.adapter.rooms);
  });

  socket.on('leaveRoom', function(data){
    socket.leave(roomID);//룸퇴장
    roomID = null;
    console.log('OUT ROOM LIST', io.sockets.adapter.rooms);
  });

  socket.on('sendMessage', function(data){
    io.sockets.in(room_id).emit('receiveMessage', data);
  });

  socket.on('typing', function(bool){
    io.emit('typing', bool)
  });
});