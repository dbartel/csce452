var DIVS = [];


function displayB(b, spn) {
    spn.innerHTML = "Size: " + b.size + " Position (" + b.x + ", " + b.y + ")";
}


function changePosition(id, spn) {
    var b = _.find(BLOCKS, function(bk) {return bk.id == id;});
    var newX = parseInt(window.prompt("X Value for " + b.id + " (size " + b.size + ")"));
    var newY = parseInt(window.prompt("Y Value for " + b.id + " (size " + b.size + ")"));

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

function displayPts(id, pt) {
  var div = document.getElementById(id);
  div.innerHTML = id +": (" + pt.x + ", " + pt.y + ")";

}

function changeStart() {
    var newX = parseInt(window.prompt("X Value for start"));
    var newY = parseInt(window.prompt("Y Value for start"));
    START_POINT = {
      x: newX,
      y: newY
    };

    resetSim();
    displayPts("start", START_POINT);

}

function changeEnd() {
    var newX = parseInt(window.prompt("X Value for end"));
    var newY = parseInt(window.prompt("Y Value for end"));
    END_POINT = {
      x: newX,
      y: newY
    };

    resetSim();
    displayPts("start", END_POINT);

}



function initListeners() {

  displayPts("start", START_POINT);
  displayPts("end", END_POINT);

	var begin = document.getElementById("begin");

  var st = document.getElementById("st");
  var en = document.getElementById("en");


  st.addEventListener("click", function() {
    changeStart();
  });

  en.addEventListener("click", function() {
    changeEnd();
  });
	
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
