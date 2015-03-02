
//Rotation functions
var _ROTATE_FUNCTIONS = {
    J0CW: jointZeroCW,
    J0CCW: jointZeroCCW,
    J1CW: jointOneCW,
    J1CCW: jointOneCCW,
    J2CW: jointTwoCW,
    J2CCW: jointTwoCCW
};


//Adds a listener to the element for clicking and holding 
function addHoldListener(elem) {
    var tm;

    elem.addEventListener("mousedown", function() {
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


}


window.onload = function() {
    initListeners();
}