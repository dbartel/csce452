
var _ROTATE_FUNCTIONS = {
    J0CW: jointZeroCW,
    J0CCW: jointZeroCCW,
    J1CW: jointOneCW,
    J1CCW: jointOneCCW,
    J2CW: jointTwoCW,
    J2CCW: jointTwoCCW
};


function addHoldListener(btn) {
    var tm;

    btn.addEventListener("mousedown", function() {
        tm  = window.setInterval(function() {
            _ROTATE_FUNCTIONS[btn.id]();
        },10);
    });

    btn.addEventListener("mouseup", function() {
        clearTimeout(tm);
    })



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


}


window.onload = function() {
    initListeners();
}