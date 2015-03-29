var socket = io();

socket.on("robot", function(msg) {
    _ROTATE_FUNCTIONS[msg]();
    var current_position = [
	{
	    x: x0,
	    y: y0
	},
	{
	    x: x1,
	    y: y1
	},
	{
	    x: x2,
	    y: y2
	}
    ];

    socket.emit("position", current_position);
    
});

socket.on("paint", function(msg) {
	addPaint(msg);
});

socket.on("init_position", function(msg) {
    x0 = msg[0].x;
    y0 = msg[0].y;
    x1 = msg[1].x;
    y1 = msg[1].y;
    x2 = msg[2].x;
    y2 = msg[2].y;
    redraw();
});
