var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile("index.html");
});

var namespace = io.of('/den-flygande-kilometern');
namespace.on('connection', function(socket){
  socket.on('join room', function(room){
    console.log('join room: ' + room);
    socket.join(room);
  });
  socket.on('start', function(msg){
  	console.log("start triggered");
  	namespace.to('master').emit('message', 'start');
  });
  socket.on('finish', function(msg){
  	namespace.to('master').emit('message', 'finish');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});