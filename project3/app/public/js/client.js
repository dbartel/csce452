var socket = io();


function addClickListener(elem) {
	var tm;
	elem.addEventListener("mousedown", function() {
		tm = window.setInterval(function() {
			socket.emit("robot", elem.id);
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

    //need a special arg for paint
    paint.addEventListener("click", function() {
    	socket.emit("paint", paint_size.value);
    });

}

window.onload = function() {
	initListeners();
}