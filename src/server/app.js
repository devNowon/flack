var path = require('path');
var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var port = process.env.PORT || 3000;

var mongoose = require('mongoose');
var passport = require('passport');
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/flack-dev';

var Message = require('./model/message.model.js');
var Channel = require('./model/channel.model.js');

app.use(express.static(path.join(__dirname, '../app')));

app.use(cors()); //enable cors

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport.js')(passport); // pass passport for configuration
app.use(require('./router/user.router.js'));
app.use(require('./router/default.router.js'));

mongoose.connect(mongoURI);

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

var clients = [];
var rooms = [];
io.on('connection', function(socket){
  clients.push(socket.id);
  io.emit('mySession', socket.id);

  Channel.find({}, function(err, channel) {
    console.log("channel : " + channel);
    if (err) {

    }
    io.emit('roomInformation', channel);
  });
  // var roomID = 'global';
  // socket.join(roomID);

  socket.on('joinRoom', function(data){
    roomID = data;
    // socket.join(roomID);
    // io.emit('roomInformation', io.sockets.adapter.rooms);
  });

  socket.on('leaveRoom', function(data){
    socket.leave(roomID);
    // roomID = 'global';
    // io.emit('roomInformation', io.sockets.adapter.rooms);
  });

  // socket.on('roomInformation', function(){
  //   io.emit('roomInformation', io.sockets.adapter.rooms);
  // });

  socket.on('sendMessage', function(data){
    // Message.save(new Message({content: data}), )
    io.sockets.in(roomID).emit('receiveMessage', data);
  });

  socket.on('typing', function(bool){
    io.emit('typing', bool)
  });

  socket.on('disconnect', function(){
    // io.emit('roomInformation', io.sockets.adapter.rooms);
  });

  socket.on('createChannel', function(data) {
    console.log(data);
    var channel = new Channel({
      name: data.name,
      type: data.type,
      teamId: data.teamId,
      members: data.members,
    });
    channel.save(function(err, channel) {
      if (err) {
        console.log(err);
        io.sockets.in(roomID).emit('createChannelErr', err);
      }
      Channel.find({}, function(err, channel) {
        if (err) {

        }
        io.emit('roomInformation', channel);
      });
    });
  });
});