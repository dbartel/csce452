var socket = io();

io.on("connection", function(socket) {
	socket.on("robot", function(msg) {
		console.log(msg);

	});
});
