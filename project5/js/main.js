var CANVAS_HEIGHT = 500;
var CANVAS_WIDTH = 500;
var POINTS = [];

var CELLS = [];

var CELL_LINES = [];

//block variable
var BLOCKS = [
	{
		id:"block-1",
		size: 200,
		x:50,
		y:20
	},
	{
		id:"block-2",
		size:150,
		x:200,
		y:240
	},
	{
		id:"block-3",
		size:100,
		x:130,
		y:400
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
    subDivide();    
}
var mx = 5;
var my = 5;

/**
* draw code (refreshes)
*/
function draw() {
	background(204);
	drawBlocks();
	drawPoints();
    drawCells();
text(mx + " " + my, 400, 400);
}

function mouseMoved() {
    mx = mouseX;
    my = mouseY;
    redraw();
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


// Returns true if blocks overlap (x)
function isOverlap(homeBlock, intrudingBlock, direction) {
    var overlap = "";
    var dir = 0;
    if (direction == "over") {
	dir = (homeBlock.y < intrudingBlock.y)
    }
    else {
	dir = (homeBlock.y > intrudingBlock.y)
    }

    if ( (intrudingBlock.x < homeBlock.x) && ( (intrudingBlock.x + intrudingBlock.size) > (homeBlock.x + homeBlock.size))) {
	overlap = "both";
    }
    else if ( intrudingBlock.x > homeBlock.x &&
	      intrudingBlock.x < (homeBlock.x + homeBlock.size)
	      && dir ) {
	overlap = "right";
    }
    else if ( intrudingBlock.x < homeBlock.x &&
	      (intrudingBlock.x + intrudingBlock.size) > homeBlock.x 
	      && dir) {
	overlap = "left";
    }
    else overlap = false;
    return overlap;
}

function drawCells() {
    for (var i = 0; i < CELL_LINES.length; i++) {
        stroke(0,0,255);
    	line(CELL_LINES[i][0], CELL_LINES[i][1], CELL_LINES[i][2], CELL_LINES[i][3]);
    	line(CELL_LINES[i][0], CELL_LINES[i][1], CELL_LINES[i][2], CELL_LINES[i][3]);
        stroke(0);


        fill(0);

    }

    stroke(7,112,63);
    for (var i = 0; i < CELLS.length; i++) {
        text("" + i, CELLS[i].left[0], CELLS[i].left[1] + 10);
    }
    stroke(0);


}





function addNewCells(newCells) {
    _.forEach(newCells, function(c) {
	if ( ! (_.find(CELLS, function(ch) { 
	    return (_.isEqual(c.left, ch.left) && _.isEqual(c.right, ch.right)); 
	}))) {
	    CELLS.push(c);
	}
    });

}

function generatePoints(block) {
    return _.extend(block, {
        "points": [
            {
                id:0,
                x: block.x,
                y: block.y,
                processed: 0
            },
            {
                id:1,
                x: block.x + block.size,
                y: block.y,
                processed: 0
            },
            {
                id:2,
                x: block.x,
                y: block.y + block.size,
                processed: 0
            },
            {
                id:3,
                x: block.x + block.size,
                y: block.y + block.size,
                processed: 0
            },
        ]
    });
}

function centerRect(block) {
    var x = (block.points[0].x + block.points[3].x) / 2;
    var y = (block.points[0].y + block.points[3].y) / 2;
    return [x,y];
}





// given a src point, draw a line down as far as possible
function getLineCoordsDown(srcBlock, srcPt, iBlock0, iBlock1) {
    var collide0 = (iBlock0.points[0].x < srcBlock.points[srcPt].x && iBlock0.points[1].x >= srcBlock.points[srcPt].x && iBlock0.y > srcBlock.y);
    var collide1 = (iBlock1.points[0].x < srcBlock.points[srcPt].x && iBlock1.points[1].x >= srcBlock.points[srcPt].x && iBlock1.y > srcBlock.y);
    var line = [];

    if (!collide0 && !collide1) {
        //no collision draw straight down
        line = [srcBlock.points[srcPt].x, srcBlock.points[srcPt].y, srcBlock.points[srcPt].x, CANVAS_HEIGHT];

    }
    else if (collide0 && collide1) {
        // find closer, that's our endpoint
        if (dist(srcBlock.points[srcPt].x, srcBlock.points[srcPt].y, iBlock0.points[0].x, iBlock0.points[0].y) <
            dist(srcBlock.points[srcPt].x, srcBlock.points[srcPt].y, iBlock1.points[0].x, iBlock1.points[0].y)) {
            //draw line to iBlock0
            line = [srcBlock.points[srcPt].x, srcBlock.points[srcPt].y, srcBlock.points[srcPt].x, iBlock0.points[0].y];
        }
        else {
            // line = [srcBlock.points[srcPt].x, srcBlock.points[srcPt].y, srcBlock.points[srcPt].x, iBlock1.points[0].y];
            line = [srcBlock.points[srcPt].x, srcBlock.points[srcPt].y, srcBlock.points[srcPt].x, iBlock1.points[0].y];
        }
    }
    else if (collide0) {
        //draw line to iBlock0
        line = [srcBlock.points[srcPt].x, srcBlock.points[srcPt].y, srcBlock.points[srcPt].x, iBlock0.points[0].y];

    }
    else if (collide1) {
        line = [srcBlock.points[srcPt].x, srcBlock.points[srcPt].y, srcBlock.points[srcPt].x, iBlock1.points[0].y];

    }

    return line;

}

function getLineCoordsUp(srcBlock, srcPt, iBlock0, iBlock1) {
    var collide0 = (iBlock0.y < srcBlock.y && iBlock0.points[2].x < srcBlock.points[srcPt].x && iBlock0.points[3].x >= srcBlock.points[srcPt].x );
    var collide1 = (iBlock1.y < srcBlock.y && iBlock1.points[2].x < srcBlock.points[srcPt].x && iBlock1.points[3].x >= srcBlock.points[srcPt].x );

    var line = [];
    if (!collide0 && !collide1) {
        line = [srcBlock.points[srcPt].x, srcBlock.points[srcPt].y, srcBlock.points[srcPt].x, 0];
    }
    else if (collide0 && collide1) {
        if (dist(srcBlock.points[srcPt].x, srcBlock.points[srcPt].y, iBlock0.points[2].x, iBlock0.points[2].y) <
            dist(srcBlock.points[srcPt].x, srcBlock.points[srcPt].y, iBlock1.points[2].x, iBlock1.points[2].y)) {

            line = [srcBlock.points[srcPt].x, srcBlock.points[srcPt].y, srcBlock.points[srcPt].x, iBlock0.points[2].y];
        }
        else {
            line = [srcBlock.points[srcPt].x, srcBlock.points[srcPt].y, srcBlock.points[srcPt].x, iBlock1.points[2].y];
        }
    }
    else if (collide0) {
        line = [srcBlock.points[srcPt].x, srcBlock.points[srcPt].y, srcBlock.points[srcPt].x, iBlock0.points[2].y];
    }
    else if (collide1) {
        line = [srcBlock.points[srcPt].x, srcBlock.points[srcPt].y, srcBlock.points[srcPt].x, iBlock1.points[2].y];
    }

    return line;
}


function getMatches(cline) {
    // Want to match a line that 
    // 1. is to the right of our line
    // 2. has the same y values as our line
    var matches = _.filter(CELL_LINES, function(c) {
        return (c[0] > cline[0])
        &&
            ((c[1] == cline[1] && c[3] == cline[3]) ||
              (c[1] == cline[3] && c[3] == cline[1])  
                );
    });
    matches = _.sortBy(matches, function(n) { return n[0]; });
    return matches;
}

function getLeftMatches(cline) {
    // special left match case
    var matches = _.filter(CELL_LINES, function(c) {
        return (c[0] < cline[0])
        &&
            ((c[1] == cline[1] && c[3] == cline[3]) ||
              (c[1] == cline[3] && c[3] == cline[1])  
                );
    });
    matches = _.sortBy(matches, function(n) { return n[0]; });
    return matches;    
}

function addLeftCell(cline) {
    var matches = getLeftMatches(cline);
    if (matches.length > 0) {
        CELLS.push({
            left: matches[0],
            right: cline
        });
    }    
}


function addCell(cline) {
    var matches = getMatches(cline);
    if (matches.length > 0) {
        CELLS.push({
            left: cline,
            right: matches[0]
        });
    }
}


function generateCells() {

    for (var i = 3; i < CELL_LINES.length; i++) {
        addCell(CELL_LINES[i]);
    }

    //build cells that filter missed
    _.forEach(BLOCKS, function(b, bi) {
        _.forEach(b.points, function(p, pi) {
            _.forEach(CELLS, function(c, ci) {
                if ( (c.left[0] == p.x || c.right[0] == p.x) && 
                      (c.left[1] == p.y ||c.left[3] == p.y)
                    ) {
                    p.processed += 1;
                }

                // special case for ends
                if ( (bi == 0) && (pi == 0 || pi == 2) && (ci == 0)) p.processed += 1;
                if ( (bi == 2) && (pi == 1 || pi == 4) && (ci == 0)) p.processed += 1;

            });            
        });

    });


    var missedCells = [];
    _.forEach(BLOCKS, function(b, bi) {
        var missedCells = _.filter(b.points, function(b) {
            return b.processed < 2;
        });


        _.forEach(missedCells, function(m) {
            if (bi == 0 && (m.id == 0 || m.id == 2)) {
                return;
            }
            if (bi == 2 && (m.id == 1 || m.id == 3)) {
                return;
            }

             //getLineCoordsDown getLineCoordsUp(srcBlock, srcPt, iBlock0, iBlock1)
            if (m.id == 0 || m.id == 1) {
                var blks = _.filter(BLOCKS, function(m) {return m != b;});
                var up = getLineCoordsUp(b, m.id, blks[0], blks[1]);
                var down = getLineCoordsDown(b, m.id, blks[0], blks[1]);
                var missingCoords = [ up[2], up[3], down[2], down[3] ];
                CELL_LINES.push(missingCoords);
                addCell(missingCoords);
                addLeftCell(missingCoords);
            }

        });
    });

    CELLS = _.sortBy(CELLS, function(c) {
        return c.left[0];
    })
}

// Divide region into cells
// Push barriers on for each block
// Push barriers for the distance between each block
function subDivide() {

    _.forEach(BLOCKS, function(b) {
        b = generatePoints(b);
    });

    var top = 0;
    var bottom = CANVAS_HEIGHT;

    BLOCKS = _.sortBy(BLOCKS, function(b) {
        return b.x
    });


    //add leftmost (border + left edge)

    CELL_LINES.push([0, top, top, bottom]);
    CELL_LINES.push([BLOCKS[0].points[0].x, top, BLOCKS[0].points[0].x, bottom]);

    CELLS.push({
        left: CELL_LINES[0],
        right: CELL_LINES[1]
    });

    // add rightmost (border + right edge)

    CELL_LINES.push([BLOCKS[2].points[3].x, top, BLOCKS[2].points[3].x, bottom]);
    CELL_LINES.push([CANVAS_WIDTH, top, CANVAS_WIDTH, bottom]);
    CELLS.push({
        left: CELL_LINES[2],
        right: CELL_LINES[3]
    });

    // BLOCKS[0].points[0].processed += 1;
    // BLOCKS[0].points[2].processed += 1;

    var left, right;


    // Add bottom CELL_LINES
    if (BLOCKS[0].points[2].y != bottom) {
        left = getLineCoordsDown(BLOCKS[0], 2, BLOCKS[1], BLOCKS[2]);

        right = getLineCoordsDown(BLOCKS[0], 3, BLOCKS[1], BLOCKS[2]);
        _.extend(BLOCKS[0], {
            bottomLeft: left,
            bottomRight: right
        });

        CELL_LINES.push(left);
        CELL_LINES.push(right);
    }


    if (BLOCKS[1].points[2].y != bottom) {
        left = getLineCoordsDown(BLOCKS[1], 2, BLOCKS[0], BLOCKS[2]);
        right =getLineCoordsDown(BLOCKS[1], 3, BLOCKS[0], BLOCKS[2]);
        _.extend(BLOCKS[1], {
            bottomLeft: left,
            bottomRight: right
        });        
    }

    if (BLOCKS[2].points[2].y != bottom) {
        left = getLineCoordsDown(BLOCKS[2], 2, BLOCKS[0], BLOCKS[1]);
        right =getLineCoordsDown(BLOCKS[2], 3, BLOCKS[0], BLOCKS[1]);
        _.extend(BLOCKS[2], {
            bottomLeft: left,
            bottomRight: right
        });

        CELL_LINES.push(left);
        CELL_LINES.push(right);        
    }


    // Add bottom CELL_LINES
    if (BLOCKS[0].points[0].y != top) {
        left = getLineCoordsUp(BLOCKS[0], 0, BLOCKS[1], BLOCKS[2]);
        right =getLineCoordsUp(BLOCKS[0], 1, BLOCKS[1], BLOCKS[2]);
        _.extend(BLOCKS[0], {
            topLeft: left,
            topRight: right
        }); 

        CELL_LINES.push(left);
        CELL_LINES.push(right);       
    }


    if (BLOCKS[1].points[0].y != top) {
        left = getLineCoordsUp(BLOCKS[1], 0, BLOCKS[0], BLOCKS[2]);
        right =getLineCoordsUp(BLOCKS[1], 1, BLOCKS[0], BLOCKS[2]);
        _.extend(BLOCKS[1], {
            topLeft: left,
            topRight: right
        });  

        CELL_LINES.push(left);
        CELL_LINES.push(right);              
    }

    if (BLOCKS[2].points[0].y != top) {
            left = getLineCoordsUp(BLOCKS[2], 0, BLOCKS[0], BLOCKS[1]);
            right =getLineCoordsUp(BLOCKS[2], 1, BLOCKS[0], BLOCKS[1]);
        _.extend(BLOCKS[2], {
            topLeft: left,
            topRight: right
        });    

        CELL_LINES.push(left);
        CELL_LINES.push(right);                
    }


    generateCells();






    console.log(BLOCKS);
    console.log(CELL_LINES);
    window.setTimeout(function() {
    	var lf = document.getElementById("left");
    	var rt = document.getElementById("right");
    	_.forEach(CELLS, function(c, i) {
    	    lf.innerHTML += i + " (" + c.left[0] + ", " + c.left[1] + ") - (" + c.left[2] + ", " + c.left[3] + ") <br>";
    	    rt.innerHTML += "(" + c.right[0] + ", " + c.right[1] + ") - (" + c.right[2] + ", " + c.right[3] + ") <br>";
    	});
        var pr = document.getElementById("processed");
        _.forEach(BLOCKS, function(c,i) {
            pr.innerHTML += i + "-" + c.points[0].processed + " " +  c.points[1].processed + " " +  c.points[2].processed + " " + c.points[3].processed + "<br>";
        });
    }, 1500);




}


// Build adjacency matrix from cells
function findAdjacencies() {
}


//Use some sort of search algorithm to find a solution
function searchGraph() {
}

// Render the solution to the canvas
function drawSolution() {
}


function solve() {
    subDivide();
    findAdjacencies();
    searchGraph();
    drawSolution();
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
/*	if(newVector.x==END_POINT.x&&newVector.y==END_POINT.y)
		//we're done
	else
		findPath(newVector.x,newVector.y); */
}
