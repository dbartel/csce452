var CANVAS_HEIGHT = 600;
var CANVAS_WIDTH = 800;



var LIGHT_SOURCES = [];
var VEHICLES = [];
var ON = false;



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
		quad(VEHICLES[i].x1, VEHICLES[i].y1, VEHICLES[i].x2, VEHICLES[i].y2 ,VEHICLES[i].x3, VEHICLES[i].y3,VEHICLES[i].x4, VEHICLES[i].y4);
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
		x1: posX,
		y1: posY,
		x2: Number(posX) + 50,
		y2: posY,
		x3: Number(posX) + 50,
		y3: Number(posY) -75,
		x4: posX,
		y4: Number(posY) -75,
		matrix: kmatrix,
		listed:false
	});
	redraw();
}

function startSim(){
	ON = true;
	move();
	
}

function stopSim(){
	ON = false;
}



function move(){
	for (i =0; i< VEHICLES.length; i++){
		var speeds = calculateSpeed(i);
		//This is where you would mess with the points!!
	}
	redraw();
}


function calculateSpeed(index){
	var s1 =0;
	var s2 =0;
	for (i =0; i< LIGHT_SOURCES.length; i++){
		distanceS1 = dist(LIGHT_SOURCES[0].x,LIGHT_SOURCES[0].y, Number(VEHICLES[index].x) + 10 , Number(VEHICLES[index].y));
		distanceS2 = dist(LIGHT_SOURCES[0].x,LIGHT_SOURCES[0].y, Number(VEHICLES[index].x) + 40 , Number(VEHICLES[index].y));
		s1 = 100 / distanceS1;
		s2 = 100 / distanceS2;
	}
	
	var w1 = 0;
	var w2 = 0;
	
	w1 = Number(VEHICLES[index].matrix.substring(0,1)) * s1 + Number(VEHICLES[index].matrix.substring(1,2)) * s2;
	w2 = Number(VEHICLES[index].matrix.substring(2,3)) * s1 + Number(VEHICLES[index].matrix.substring(3,4)) * s2;
	
	return [w1,w2];
}


