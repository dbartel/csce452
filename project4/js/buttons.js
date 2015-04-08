function listLights() {
    var lightList = document.getElementById("light-list");
    for (var i = 0; i < LIGHT_SOURCES.length; i++) {
        if (!LIGHT_SOURCES[i].listed) {
            var dv = document.createElement("div");
            dv.innerHTML = "(" + LIGHT_SOURCES[i].x + "," + LIGHT_SOURCES[i].y + ")";

            lightList.appendChild(dv);
            LIGHT_SOURCES[i].listed = true;

        }
    }
}

function listVehicles() {

}


function initListeners() {
    var addVehicle = document.getElementById("add-vehicle");
    var addLight = document.getElementById("add-light");

    addLight.addEventListener("click", function() {
        createLight();
        listLights();
    });
	
		
	addVehicle.addEventListener("click", function() {
        createVehicle();
    })
}


window.onload = function() {
    initListeners();
}
