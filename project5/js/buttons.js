var DIVS = [];

//Generic display element to vehicle/light lists
function listElements(parentId, arr) {
    var parent = document.getElementById(parentId);
    for (var i = 0; i < window[arr].length; i++) {
        if (!window[arr][i].listed) {
            var dv = document.createElement("div");
            dv.innerHTML = "(" + window[arr][i].x + "," + window[arr][i].y + ")";
			DIVS.push(dv);
            dv.id = window[arr][i].id;
            dv.class = "list-item";
            dv.addEventListener("click", function() {
                // removeElement(dv.id, parentId, arr);
                // console.log(this.id);
                var it = Number(this.id.substr(6,1)) - 1;
                var newX = window.prompt("Enter new x");
                var newY = window.prompt("Enter new y");
                window[arr][it].x = newX;
                window[arr][it].y = newY;
                redraw();
				//console.log(it);
				DIVS[it].innerHTML = "(" + window[arr][it].x + "," + window[arr][it].y + ")";
            });

            parent.appendChild(dv);
            window[arr][i].listed = true;

        }
    }
}


function listPoint(parentId, pt) {
    var parent = document.getElementById(parentId);
    var dv = document.createElement("div");

    dv.innerHTML = "(" + window[pt].x + "," + window[pt].y + ")";
    dv.addEventListener("click", function() {
        var newX = window.prompt("Enter new x");
        var newY = window.prompt("Enter new y");

        window[pt].x = newX;
        window[pt].y = newY;
        redraw();
		dv.innerHTML = "(" + window[pt].x + "," + window[pt].y + ")";
    });

    parent.appendChild(dv);
    
}



function initListeners() {
    listElements("blocks","BLOCKS");
    listPoint("start","START_POINT");
    listPoint("end", "END_POINT");
	
	var begin = document.getElementById("begin");
	
	begin.addEventListener("click", function() {
        // decomp();
        solve();
    })

}


window.onload = function() {
    initListeners();
}
