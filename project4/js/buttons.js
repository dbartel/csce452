
//Generic display element to vehicle/light lists
function listElements(parentId, arr) {
    var parent = document.getElementById(parentId);
    for (var i = 0; i < window[arr].length; i++) {
        if (!window[arr][i].listed) {
            var dv = document.createElement("div");

            if (arr == "VEHICLES") {
                var ds = "<table><tr><td>v" + i + "</td><td>" + window[arr][i].matrix[0] + "</td><td>" + window[arr][i].matrix[1] +
                "</td></tr><tr><td></td><td>" + window[arr][i].matrix[2] + "</td><td>" + window[arr][i].matrix[3] + "</td></tr></table>";
                dv.innerHTML = ds;
            }
            else dv.innerHTML = "(" + window[arr][i].x + "," + window[arr][i].y + ")";

            dv.id = window[arr][i].id;
            dv.class = "list-item";
            dv.addEventListener("click", function() {
                removeElement(dv.id, parentId, arr);
            });

            parent.appendChild(dv);
            window[arr][i].listed = true;

        }
    }
}

//Generic remove element fn for vehicles and lights
function removeElement(childId, parentId, arr) {
    if (window.confirm("Remove?")) {
        var parentElem = document.getElementById(parentId);
        var childElem = document.getElementById(childId);
        parentElem.removeChild(childElem);

        for (var i = 0; i < window[arr].length; i++) {
            if (window[arr][i].id == childId) {
                window[arr].splice(i, 1);
                redraw();
                break;
            }
        }
    }
}


function initListeners() {
    var addVehicle = document.getElementById("add-vehicle");
    var addLight = document.getElementById("add-light");
	var start = document.getElementById("start");

    addLight.addEventListener("click", function() {
        createLight();
        listElements("light-list", "LIGHT_SOURCES");
    });
	
		
	addVehicle.addEventListener("click", function() {
        createVehicle();
        listElements("vehicle-list", "VEHICLES");
    });
	
	start.addEventListener("click", function() {
        toggleSim();
    })
}


window.onload = function() {
    initListeners();
}
