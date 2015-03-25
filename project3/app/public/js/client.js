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
	var J2CW = document.getElementById("J2CW");
	addClickListener(J2CW);
}

window.onload = function() {
	initListeners();
}