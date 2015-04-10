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

function generateId() {
	return Math.random().toString(36).substring(7);
}

function createLight() {
	var posX = window.prompt("Enter x position", 0);
	var posY = window.prompt("Enter y position", 0);
	LIGHT_SOURCES.push({
		x: posX,
		y: posY,
		listed:false,
		id: generateId()
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
		y3: Number(posY) +75,
		x4: posX,
		y4: Number(posY) +75,
		matrix: kmatrix,
		listed:false,
		id: generateId()
	});
	redraw();
}

function startSim(){
	ON = true;
	move();
	//calculateSpeed(0);
	
}

function stopSim(){
	ON = false;
}



function move(){
	for (j = 0; j< VEHICLES.length; j++){
		var speeds = calculateSpeed(j);
		console.log(VEHICLES[j].x3);
		console.log(VEHICLES[j].x4);
		console.log(VEHICLES[j].y3);
		console.log(VEHICLES[j].y4);
		
		
		VEHICLES[j].x4 = Number(VEHICLES[j].x4) - speeds[0];
		VEHICLES[j].y4 = Number(VEHICLES[j].y4) - speeds[0];
		
		VEHICLES[j].x3 = Number(VEHICLES[j].x3) - speeds[1];
		VEHICLES[j].y3 = Number(VEHICLES[j].y3) - speeds[1];
		
		console.log(VEHICLES[j].x3);
		console.log(VEHICLES[j].x4);
		console.log(VEHICLES[j].y3);
		console.log(VEHICLES[j].y4);
		
		//Calc angle
		var angle = 90;
		if (VEHICLES[j].y4 >= VEHICLES[j].y3){
			//alert("I am here");
			var diff = ( dist( Number(VEHICLES[j].x3), 0, Number(VEHICLES[j].x4), 0) ) / ( dist( Number(VEHICLES[j].x3), Number(VEHICLES[j].y3), Number(VEHICLES[j].x4), Number(VEHICLES[j].y4)) );
			console.log(diff);
			angle = 180 - 90 - acos(diff);
		}
		else{
			var diff = ( dist( Number(VEHICLES[j].x3), 0, Number(VEHICLES[j].x4), 0) ) / ( dist( Number(VEHICLES[j].x3), Number(VEHICLES[j].y3), Number(VEHICLES[j].x4), Number(VEHICLES[j].y4)) );
			console.log(diff);
			angle = acos(diff);
		}
		
		console.log(angle);
		
		//Figure out Point One and Two
		VEHICLES[j].x2 = Number(VEHICLES[j].x3) - (75 * cos(angle));
		VEHICLES[j].y2 = Number(VEHICLES[j].y3) -  75 * sin(angle);
		
		console.log(VEHICLES[j].x1 + "  " + VEHICLES[j].y1);
		
		
		VEHICLES[j].x1 = Number(VEHICLES[j].x4) - (75 * cos(angle));
		VEHICLES[j].y1 = Number(VEHICLES[j].y4) -  75 * sin(angle);
		
		
	}
	redraw();
}


function calculateSpeed(index){
	var s1 =0;
	var s2 =0;
	for (i =0; i< LIGHT_SOURCES.length; i++){
		distanceS1 = dist(LIGHT_SOURCES[0].x,LIGHT_SOURCES[0].y, Number(VEHICLES[index].x1) + 10 , Number(VEHICLES[index].y1));
		distanceS2 = dist(LIGHT_SOURCES[0].x,LIGHT_SOURCES[0].y, Number(VEHICLES[index].x1) + 40 , Number(VEHICLES[index].y1));
		
	//console.log(distanceS1);
	//console.log(distanceS2);
		
		s1 = 100 / distanceS1;
		s2 = 100 / distanceS2;
	}
	//console.log(s1);
	//console.log(s2);
	
	var w1 = 0;
	var w2 = 0;

	w1 = Number(VEHICLES[index].matrix.substring(0,1)) * s1 + Number(VEHICLES[index].matrix.substring(1,2)) * s2;
	w2 = Number(VEHICLES[index].matrix.substring(2,3)) * s1 + Number(VEHICLES[index].matrix.substring(3,4)) * s2;
	
	//console.log(w1);
	//console.log(w2);
	
	return [w1,w2];
}


