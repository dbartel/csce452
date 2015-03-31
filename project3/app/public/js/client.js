var socket = io();


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
			}
		    }

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
    });

}

window.onload = function() {
	initListeners();
}
