//var WebSocketServer = require("ws").Server
var http = require("http");
var express = require("express");
var app = express();
var request = require('superagent');
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/app"));

app.get('/channel', function(req, res) {
  var data = {
    'dev' : {
      user : 2
    },
    'local' : {
      user : 1
    }
  };
  res.send(data);
});
var user =[];
app.get('/user/list', function(req,res) {
  user = [
    {
      id : 'id',
      name : 'name',
    },
    {
      id : 'id2',
      name : 'name2',
    }
  ];
  res.send(user);
});

var server = http.createServer(app);

var io = require('socket.io')(server);

server.listen(port);

console.log("http server listening on %d", port);

io.on('connection', function(socket){
  console.log('a user connected');
    console.log(socket.id);
    // console.log(io.of('/').clients());
    io.emit('userID', socket.id);
  console.log(io.engine.clientsCount);
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(user);
  });

  socket.on('private message', function(msg){
    io.emit('private message', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    // user.push({id : 'id',name : socket.id});
  });
  socket.on('typing', function(bool){
    io.emit('typing', bool);
  });
});