var DIVS = [];


function displayB(b, spn) {
    console.log(b);
    spn.innerHTML = "Size: " + b.size + " Position (" + b.x + ", " + b.y + ")";
}


function changePosition(id, spn) {
    var b = _.find(BLOCKS, function(bk) {return bk.id == id;});
    var newX = window.prompt("New X: ");
    var newY = window.prompt("New Y: ");
    b.x = newX;
    b.y = newY;

    displayB(b, spn);
}

function initButton(bid, spid) {
   var btn = document.getElementById(bid);
   var spn = document.getElementById(spid);

   btn.addEventListener("click", function() {
       changePosition(spid, spn);
       resetSim();
   });
}



function initListeners() {

	var begin = document.getElementById("begin");
	
	begin.addEventListener("click", function() {
        resetSim();
        solve();
    });

    // var btn, spn;
    for (var i = 1; i < 4; i++) {
        initButton("btn-" + i, "block-" + i);
        var id = (i-1)
        displayB(BLOCKS[id], document.getElementById("block-" + i));

    }

}


window.onload = function() {
    initListeners();
}
