var socket = io();

socket.on("robot", function(msg) {
    _ROTATE_FUNCTIONS[msg]();
    var current_position = {
	paint: PaintArray,
	position: [{
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
	}]
    };
    

    socket.emit("position", current_position);
    
});

socket.on("paint", function(msg) {
	addPaint(msg);
});

socket.on("init_position", function(msg) {

    x0 = msg.position[0].x;
    y0 = msg.position[0].y;
    x1 = msg.position[1].x;
    y1 = msg.position[1].y;
    x2 = msg.position[2].x;
    y2 = msg.position[2].y;
    PaintArray = msg.paint;
    redraw();



});
