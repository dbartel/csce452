var CANVAS_HEIGHT = window.innerHeight;
var CANVAS_WIDTH = window.innerWidth * 0.75;


/**
 * setup code
*/   
function setup() {
    createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT);
}


/**
* draw code (refreshes)
*/
function draw() {
    ellipse(200, 400, 80, 150);
    ellipse(200,285,80,100);
    ellipse(200,200,80,75);

}