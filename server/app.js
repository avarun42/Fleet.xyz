"use strict";
var express = require('express');
var app = express();
var randomstring = require('randomstring');

var server = require('http').createServer(app);
//var io = require('socket.io')(http);
var io = require('socket.io')(server);
var port = process.env.PORT||3000;
var location_pack = {};
var groups = [];
var destination;



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){


  
  //car's vin
  socket.on('location', function(location){
  	location_pack[location.VIN] = location;
    io.emit('location pack', location_pack);
  });

  socket.on('empty',function(){
  	location_pack = {};
  });

  socket.on('message', function(message){
  	io.emit('message', message);
  });

  //when a car exits
  socket.on('exit', function(location){
  	delete location_pack[location.VIN];
  	io.emit('location pack', location_pack);
  });

  //when disconnect
  socket.on('disconnect', function(location){
  	console.log(location);
  	delete location_pack[location.VIN];
  	io.emit('location pack', location_pack);
  });

  socket.on('destination', function(location){
  	destination = location;
  	io.emit('destination', destination);
  });

  //team stuff if we actually have time for this ever
  socket.on('create team', function(location){
  	var code = randomstring.generate(4);
  	groups.push(code);
  } );

  socket.on('join team', function(code){
  	if (groups.find(code)) {
  		io.emit('grant access', code);
  	}
  });

});

server.listen(port, function(){
  console.log('listening on *:3000');
});
