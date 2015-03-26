var socket = io();

socket.on("robot", function(msg) {
	_ROTATE_FUNCTIONS[msg]();
});

socket.on("paint", function(msg) {
	addPaint(msg);
});
