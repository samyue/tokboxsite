var express = require('express');



var app = express();



var http = require('http');



var server = http.createServer(app);



var io = require('socket.io').listen(server, {log:false});

var portNumber = 1339;

server.listen(portNumber);

console.log('listen on ' + portNumber);


app.get('/test', function(req, res){

	res.writeHead(200, {

		'Content-Type' : 'text/plain'

	});

	res.end('Good Day');

});


io.configure(function () {

	io.set("transports", ["xhr-polling", "jsonp-polling"]);

});



io.sockets.on('connection', function (socket) {
	console.log('connected!');
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
	    console.log(data);
	});

	socket.on('newMessage', function(data){
		console.log('get new message: ', data);
		socket.broadcast.emit('newMessage', data);	

	})
});




