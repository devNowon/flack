//var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 3000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)

var io = require('socket.io')(server);

server.listen(port)

console.log("http server listening on %d", port)

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('typing', function(bool){
    io.emit('typing', bool)
  });
});