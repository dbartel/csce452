var socket = io();
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



var _ROTATE_FUNCTIONS = {
    J0CW: jointZeroCW,
    J0CCW: jointZeroCCW,
    J1CW: jointOneCW,
    J1CCW: jointOneCCW,
    J2CW: jointTwoCW,
    J2CCW: jointTwoCCW,
    J2PX: jointTwoPX,
    J2MX: jointTwoMX,
    J2PY: jointTwoPY,
    J2MY: jointTwoMY
};


function addClickListener(elem) {
	var tm;
    var delayMode = document.getElementById("delay-mode");
    var paintForever = document.getElementById("paint-forever");
    var paint_size = document.getElementById("paint-size");
	elem.addEventListener("mousedown", function() {
		tm = window.setInterval(function() {
		    _ROTATE_FUNCTIONS[elem.id]();
		    if (delayMode.checked) {
			window.setTimeout(function() {
			    socket.emit("robot", elem.id);
			    if (paintForever.checked) {
				socket.emit("paint", paint_size.value);
			    }
			}, 2000);
		    }
		    else {

			socket.emit("robot", elem.id);
			if (paintForever.checked) {
			    socket.emit("paint", paint_size.value);
                addPaint(paint_size.value);
			}
		    }

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


		}, 10);

	});

	elem.addEventListener("mouseup", function() {
		clearTimeout(tm);
	});

	elem.addEventListener("mouseleave", function() {
		if (tm) clearTimeout(tm);
	});
}

function initListeners() {
    var J1CW = document.getElementById("J1CW");
    var J1CCW = document.getElementById("J1CCW");

    var J2CW = document.getElementById("J2CW");
    var J2CCW = document.getElementById("J2CCW");

    var J3CW = document.getElementById("J3CW");
    var J3CCW = document.getElementById("J3CCW");

    var paint_size = document.getElementById("paint-size");

    var J2PX = document.getElementById("J2PX");
    addClickListener(J2PX);
    var J2MX = document.getElementById("J2MX");
    addClickListener(J2MX);
    var J2PY = document.getElementById("J2PY");
    addClickListener(J2PY);
    var J2MY = document.getElementById("J2MY");
    addClickListener(J2MY);

    addClickListener(J2CW);
    addClickListener(J2CCW);
    
    addClickListener(J1CW);
    addClickListener(J1CCW);

    addClickListener(J0CW);
    addClickListener(J0CCW);

    var paint = document.getElementById("paint-button");
    var delayMode = document.getElementById("delay-mode");
    
    
    delayMode.addEventListener("click", function() {
	var delayInfo = document.getElementById("delay-info");
	if (delayMode.checked) {
	    delayInfo.innerHTML = "Delay mode is active! Commands will be delayed over 2 seconds";
	}
	else {
	    delayInfo.innerHTML = "";
	}
    });

    //need a special arg for paint
    paint.addEventListener("click", function() {
	if (delayMode.checked) {
	    window.setTimeout(function() {
    		socket.emit("paint", paint_size.value);
	    }, 2000);	    
	}
	else {
    	    socket.emit("paint", paint_size.value);
	}
    addPaint(paint_size.value);
    });

    var reset = document.getElementById("reset-btn");

    reset.addEventListener("click", function() {
        socket.emit("reset", 1);
        BASE_X = 400;
        BASE_Y = 400;

        x0 = 400;
        y0 = 250;
        Th0 = 90;

        x1 = 400;
        y1 = 150;
        Th1 = 90;

        x2 = 400;
        y2 = 75;
        Th2 = 90;

        Thk0 = 90;
        Thk1 = 0;
        Thk2 = 0; 
        redraw();
    });

}

window.onload = function() {
	initListeners();
}
