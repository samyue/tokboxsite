$(document).ready(function(){

	var socket = io.connect('http://ec2-54-213-131-240.us-west-2.compute.amazonaws.com:1339');
	console.log('socket is:', socket);
	socket.on('news', function (data) {
		console.log('get news!')
		console.log(data);
		socket.emit('my other event', { my: 'data' });
	});


	socket.on('newMessage', function (data) {
		console.log('get new message: ', data);
		if(data.username != getUsername()) {
			addMessageToChatroom(data.username, data.message);
		}
		
	});





	$('#sendMessage').on('click', function(){
		var message = $('#message').val();
		if(message == '') {
			alert('Message should not be empty.');
			return;
		}

		addMessageToChatroom(getUsername(), message);
		sendMessageToOtherUsers(getUsername(), message);


	});

	function addMessageToChatroom(username, message) {
		var messages = $('#chatroom').val();
		messages = messages + '\n' + username + ': ' +message;

		$('#chatroom').val(messages);

	}

	function sendMessageToOtherUsers(username, message) {
		socket.emit('newMessage', {username:username, message:message});
	}




})
