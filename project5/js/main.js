var CANVAS_HEIGHT = 500;
var CANVAS_WIDTH = 500;
var POINTS = [];

//block variable
var BLOCKS = [
	{
		id:"block-1",
		size: 200,
		x:0,
		y:0
	},
	{
		id:"block-2",
		size:150,
		x:100,
		y:250
	},
	{
		id:"block-3",
		size:100,
		x:300,
		y:300
	}
];

var START_POINT = {
	x:40,
	y:300
};

var END_POINT = {
	x:490,
	y:490
};



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
	drawBlocks();
	drawPoints();

	//Draw Lights
	//c = color(255, 204, 0);
}

function drawBlocks() {
	fill(0);
	for (var i = 0; i < BLOCKS.length; i++) {
		rect(BLOCKS[i].x, BLOCKS[i].y,BLOCKS[i].size,BLOCKS[i].size);
	}
	fill(255);
}

function drawPoints() {
	fill(0,255,0);
	ellipse(START_POINT.x, START_POINT.y, 10, 10);
	fill(200,0,255);
	ellipse(END_POINT.x, END_POINT.y, 10, 10);
	fill(0);
}

//the button press will call this function with the arguments START_POINT.x,START_POINT.y
//that function will also put START_POINT.x and START_POINT.y 
function findPath(x,y)
{
	var newVector
	//figure out non blocked points of interest
	
	//calculate the closest one
	
	//set closest point as the values of newVector
	
	POINTS.push(newVector);
	if(newVector.x==END_POINT.x&&newVector.y==END_POINT.y)
		//we're done
	else
		findPath(newVector.x,newVector.y);
}