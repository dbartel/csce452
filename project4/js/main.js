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

	drawPaint();


    
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

	//add light to LIGHT_SOURCES array
}

function createVehicle() {

}
