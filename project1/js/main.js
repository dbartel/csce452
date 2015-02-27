var CANVAS_HEIGHT = window.innerHeight;
var CANVAS_WIDTH = window.innerWidth * 0.75;

var x1 = 200;
var y1 = 250;
var Th1 = 90;

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
    line(200, 400, x1, y1);
	}

function jointOneCW(){
	//x+=10;
	Th1-=1;
	x1=200-150*cos(Th1);
	y1=400+150*sin(Th1);
	
	redraw();
}
