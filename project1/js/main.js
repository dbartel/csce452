var CANVAS_HEIGHT = window.innerHeight;
var CANVAS_WIDTH = window.innerWidth * 0.75;

var BASE_X = 200;
var BASE_Y = 400;

var x0 = 200;
var y0 = 250;
var Th0 = 90;

var x1 = 200;
var y1 = 150;
var Th1 = 90;

var x2 = 200;
var y2 = 75;
var Th2 = 90;
//
var jointZeroColor;
var jointOneColor;
var jointTwoColor;


//Paint Array stores every area that's been "painted"
var PaintArray = [];




/**
 * setup code
*/   
function setup() {
    createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT);
	angleMode(DEGREES);
    
    jointZeroColor = color(27,195,61);
    jointOneColor = color(27,44,195);
    jointTwoColor = color(205,85,85);
    
	noLoop();
}


/**
* draw code (refreshes)
*/
function draw() {
	background(204);

	drawPaint();

//    fill(27,196,61);
    stroke(jointZeroColor);
    line(BASE_X, BASE_Y, x0, y0);
    
    stroke(jointOneColor);
	line(x0, y0, x1, y1);
    
    stroke(jointTwoColor);
	line(x1, y1, x2, y2);
    
    stroke(0,0,0);
	calLines();
	}

function jointZeroCW(){
	Th0+=1;
	var dx=x0;
	var dy=y0;
	x0=BASE_X-150*cos(Th0);
	y0=BASE_Y-150*sin(Th0);
	dx=Math.abs(dx-x0);
	dy=Math.abs(dy-y0);
	x1=x1+dx;
	y1=y1+dy;
	x2=x2+dx;
	y2=y2+dy;
	redraw();
}

function jointZeroCCW(){
	Th0-=1;
	var dx=x0;
	var dy=y0;
	x0=BASE_X-150*cos(Th0);
	y0=BASE_Y-150*sin(Th0);
	dx=Math.abs(dx-x0);
	dy=Math.abs(dy-y0);
	x1=x1-dx;
	y1=y1+dy;
	x2=x2-dx;
	y2=y2+dy;
	redraw();
}

function jointOneCW(){
	Th1+=1;
	var dx=x1;
	var dy=y1;
	x1=x0-100*cos(Th1);
	y1=y0-100*sin(Th1);
	dx=Math.abs(dx-x1);
	dy=Math.abs(dy-y1);
	x2=x2+dx;
	y2=y2+dy;
	
	redraw();
}

function jointOneCCW(){
	Th1-=1;
	var dx=x1;
	var dy=y1;
	x1=x0-100*cos(Th1);
	y1=y0-100*sin(Th1);
	dx=Math.abs(dx-x1);
	dy=Math.abs(dy-y1);
	x2=x2-dx;
	y2=y2+dy;
	redraw();
}

function jointTwoCW(){
	Th2+=1;
	x2=x1-75*cos(Th2);
	y2=y1-75*sin(Th2);
	redraw();
}

function jointTwoCCW(){
	Th2-=1;
	x2=x1-75*cos(Th2);
	y2=y1-75*sin(Th2);
	redraw();
}

function calLines(){
	var distance0 = dist(200,400,x0,y0);
	var distance1 = dist(x0,y0,x1,y1);
	var distance2 = dist(x1,y1,x2,y2);
	text(String(distance0), 500,300);
	text(String(distance1), 500,200);
	text(String(distance2), 500,100);
}

//draws paint
function drawPaint() {
	for (var i = 0; i < PaintArray.length; i++) {
		fill(0,0,0);
		ellipse(PaintArray[i].x, PaintArray[i].y, 10, 10);
	}
	noFill();	
}

//adds coordinate to paint array
function addPaint() {
	PaintArray.push({
		x: x2,
		y: y2
	});
	redraw();
}