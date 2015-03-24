
//Rotation functions
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


//Adds a listener to the element for clicking and holding 
function addHoldListener(elem) {
    var tm;

    elem.addEventListener("mousedown", function() {
		_ROTATE_FUNCTIONS[elem.id]();
         tm  = window.setInterval(function() {
            _ROTATE_FUNCTIONS[elem.id]();
        },10); 
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


    var J2PX = document.getElementById("J2PX");
    addHoldListener(J2PX);
    var J2MX = document.getElementById("J2MX");
    addHoldListener(J2MX);
    var J2PY = document.getElementById("J2PY");
    addHoldListener(J2PY);
    var J2MY = document.getElementById("J2MY");
    addHoldListener(J2MY);
    var J1PX = document.getElementById("J1PX");
    addHoldListener(J1PX);
    var J1MX = document.getElementById("J1MX");
    addHoldListener(J1MX);
    var J1PY = document.getElementById("J1PY");
    addHoldListener(J1PY);
    var J1MY = document.getElementById("J1MY");
    addHoldListener(J1MY);
    var J0PX = document.getElementById("J0PX");
    addHoldListener(J0PX);
    var J0MX = document.getElementById("J0MX");
    addHoldListener(J0MX);
    var J0PY = document.getElementById("J0PY");
    addHoldListener(J0PY);
    var J0MY = document.getElementById("J0MY");
    addHoldListener(J0MY);

    addHoldListener(J2CW);
    addHoldListener(J2CCW);
    
    addHoldListener(J1CW);
    addHoldListener(J1CCW);

    addHoldListener(J0CW);
    addHoldListener(J0CCW);

    var paintForeverTimeout;

    var paintForever = document.getElementById("paint-forever");

    paintForever.addEventListener("click", function() {
        if (! paintForever.checked) {
            clearTimeout(paintForeverTimeout);
        }
    });

    //paint doesn't need to be held, so add normal click listener
    var painter = document.getElementById("paint-button");
    painter.addEventListener("click", function() {
        if (paintForever.checked) {
            paintForeverTimeout = window.setInterval(function() {
                addPaint();
            }, 10)
        }
        else {

            addPaint();
        }
    });

	var bunny = document.getElementById("bunny-button");
    bunny.addEventListener("click", function() {
        drawbunny();
    })

}


window.onload = function() {
    initListeners();
}
