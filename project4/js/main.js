var CANVAS_HEIGHT = 600;
var CANVAS_WIDTH = 800;



var LIGHT_SOURCES = [];
var VEHICLES = [];




/**
 * setup code
*/   
function setup() {
    createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT);
	angleMode(DEGREES);
    

	noLoop();
}


/**
* draw code (refreshes)
*/
function draw() {
	background(204);

	//drawPaint();

	//Draw Lights
	//c = color(255, 204, 0);
	fill(255, 204, 0);  
	noStroke();  
	
	for (i =0; i< LIGHT_SOURCES.length; i++){
		ellipse(LIGHT_SOURCES[i].x, LIGHT_SOURCES[i].y, 50, 50);
	}
	
	fill(153); 
	
	for (i =0; i< VEHICLES.length; i++){
		rect(VEHICLES[i].x, VEHICLES[i].y, 50, 75);
	}
	
    //stroke(0,0,0);
	//calLines();
}

function createLight() {
	var posX = window.prompt("Enter x position", 0);
	var posY = window.prompt("Enter y position", 0);
	LIGHT_SOURCES.push({
		x: posX,
		y: posY,
		listed:false
	});
	redraw();
	//add light to LIGHT_SOURCES array
}

function createVehicle() {
	var posX = window.prompt("Enter x position", 0);
	var posY = window.prompt("Enter y position", 0);
	var kmatrix = window.prompt("Enter K matrix", 1001);
		VEHICLES.push({
		x: posX,
		y: posY,
		matrix: kmatrix,
		listed:false
	});
	redraw();
}


