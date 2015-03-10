var CANVAS_HEIGHT = 425;
var CANVAS_WIDTH = 800;

var BASE_X = 400;
var BASE_Y = 400;

var x0 = 400;
var y0 = 250;
var Th0 = 90;

var x1 = 400;
var y1 = 150;
var Th1 = 90;

var x2 = 400;
var y2 = 75;
var Th2 = 90;

//joint color globals
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

    stroke(jointZeroColor);
    line(BASE_X, BASE_Y, x0, y0);
    
    stroke(jointOneColor);
	line(x0, y0, x1, y1);
    
    stroke(jointTwoColor);
	line(x1, y1, x2, y2);
    
    stroke(0,0,0);
	//calLines();
	}

function jointZeroCW(){
	if(Th0!=180 && Th1>Th0-175 )
		Th0+=1;
	x0=BASE_X-150*cos(Th0);
	y0=BASE_Y-150*sin(Th0);
	x1=x0-100*cos(Th1);
	y1=y0-100*sin(Th1);
	x2=x1-75*cos(Th2);
	y2=y1-75*sin(Th2);
	redraw();
}

function jointZeroCCW(){
	if(Th0!=0 && Th1<Th0+175 )
		Th0-=1;
	x0=BASE_X-150*cos(Th0);
	y0=BASE_Y-150*sin(Th0);
	x1=x0-100*cos(Th1);
	y1=y0-100*sin(Th1);
	x2=x1-75*cos(Th2);
	y2=y1-75*sin(Th2);
	redraw();
}

function jointOneCW(){
	if((Th1<Th0+175) && Th2>Th1-175 )
		Th1+=1
	x1=x0-100*cos(Th1);
	y1=y0-100*sin(Th1);
	x2=x1-75*cos(Th2);
	y2=y1-75*sin(Th2);
	
	redraw();
}

function jointOneCCW(){
	if(Th1>Th0-175 && (Th2<Th1+175))
		Th1-=1;
	x1=x0-100*cos(Th1);
	y1=y0-100*sin(Th1);
	x2=x1-75*cos(Th2);
	y2=y1-75*sin(Th2);
	redraw();
}

function jointTwoCW(){
	if((Th2<Th1+175))
		Th2+=1;
	x2=x1-75*cos(Th2);
	y2=y1-75*sin(Th2);
	redraw();
}

function jointTwoCCW(){
	if(Th2>Th1-175)	
		Th2-=1;
	x2=x1-75*cos(Th2);
	y2=y1-75*sin(Th2);
	redraw();
}

function onLine(xp1,yp1,xp2,yp2,xc,yc){
	var m = (yp2-yp1)/(xp2-xp1);
	if ( ((m * xc) - (m * xp1) + yp1) == yc)
		return true;
	else
		return false;
}

function calLines(){
	var distance0 = dist(200,400,x0,y0);
	var distance1 = dist(x0,y0,x1,y1);
	var distance2 = dist(x1,y1,x2,y2);
	text(String(distance0), 500,300);
	text(String(distance1), 500,200);
	text(String(distance2), 500,100);
}

function drawbunny(){
	for( i = 0; i < 90; i++){
		addPaint();
		jointZeroCW();
	}
	for( i = 0; i < 90; i++){
		jointZeroCCW();
	}
	for( i = 0; i < 90; i++){

		addPaint();
		jointZeroCCW();
	}
	for( i = 0; i < 100; i++){
		jointZeroCW();
	}
	for( i = 0; i < 82; i++){
		jointOneCCW();
		jointTwoCCW();
	}
	for( i = 0; i < 40; i++){
		addPaint();
		jointOneCCW();
		jointTwoCCW();
	}
	for( i = 0; i < 60; i++){
		addPaint();
		jointZeroCW();
		if (i < 20 || i > 40 || i > 60){
			jointOneCW();
		}	
	}
	for( i = 0; i < 79; i++){
		jointZeroCCW();
	}
	for( i = 0; i < 40; i++){
		jointTwoCW();
	}
	for( i = 0; i < 165; i++){
		jointOneCW();
		jointTwoCW();
	}
	for( i = 0; i < 40; i++){
		addPaint();
		jointOneCW();
		jointTwoCW();
	}
	for( i = 0; i < 60; i++){
		addPaint();
		jointZeroCCW();
		if (i < 20 || i > 40 || i > 60){
			jointOneCCW();
		}	
	}
	for( i = 0; i < 23; i++){
		addPaint();
		if (i % 2 == 0) jointZeroCCW();
		jointOneCCW();
	}
	for( i = 0; i < 10; i++){
		jointTwoCW();
		addPaint();
	}
	for( i = 0; i < 10; i++){
		jointTwoCW();
		jointOneCCW();
		addPaint();
	}

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

// x/y functions
function jointTwoPX() {
	// ...
}
function jointTwoMX() {
	// ...
}
function jointTwoPY() {
	// ...
}
function jointTwoMY() {
	// ...
}
function jointOnePX() {
	// ...
}
function jointOneMX() {
	// ...
}
function jointOnePY() {
	// ...
}
function jointOneMY() {
	// ...
}
function jointZeroPX() {
	// ...
}
function jointZeroMX() {
	// ...
}
function jointZeroPY() {
	// ...
}
function jointZeroMY() {
	// ...
}