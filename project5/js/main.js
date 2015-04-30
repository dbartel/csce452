var CANVAS_HEIGHT = 500;
var CANVAS_WIDTH = 500;
var POINTS = [];

var CELLS = [];

var CELL_LINES = [];

var LEFT_CELL = false;
var RIGHT_CELL = false;

//block variable
var BLOCKS = []

var START_POINT = {
	x:40,
	y:300
};

var END_POINT = {
	x:490,
	y:50
};



/**
 * setup code
*/   
function setup() {

    BLOCKS = [
    {
        id:"block-1",
        size: 200,
        x:150,
        y:0
    },
    {
        id:"block-2",
        size:150,
        x:300,
        y:250
    },
    {
        id:"block-3",
        size:100,
        x: 150,
        y:340
    }
    ];





    createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT);
	angleMode(DEGREES);
	noLoop();
    POINTS = [];

    // subDivide();
    // findAdjacencies();
    // searchGraph()
}

/**
* draw code (refreshes)
*/
function draw() {
	background(204);
	drawBlocks();
	drawPoints();
    drawCells();
    drawSolutionPoints();
    
}



function drawBlocks() {
	fill(0);
	for (var i = 0; i < BLOCKS.length; i++) {
		rect(BLOCKS[i].x, BLOCKS[i].y,BLOCKS[i].size,BLOCKS[i].size);
	}
	fill(255);
}

function drawSolutionPoints() {
    stroke(0,255,0);
    for (var i = 0; i < POINTS.length - 1; i++) {
        line(POINTS[i].x, POINTS[i].y, POINTS[i+1].x, POINTS[i+1].y);
    }
    stroke(0);
    if (POINTS != []) noLoop();
}

function resetSim() {
    CELLS = [];
    POINTS = [];
    CELL_LINES = [];
    LEFT_CELL = false;
    RIGHT_CELL = false; 
    // clear();
    redraw();   
}


function drawPoints() {
	fill(0,255,0);
	ellipse(START_POINT.x, START_POINT.y, 10, 10);
	fill(200,0,255);
	ellipse(END_POINT.x, END_POINT.y, 10, 10);
	fill(0);
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



// given a src point, draw a line down as far as possible
function getLineCoordsDown(srcBlock, srcPt, iBlock0, iBlock1) {
    var collide0 = (iBlock0.points[0].x < srcBlock.points[srcPt].x && iBlock0.points[1].x >= srcBlock.points[srcPt].x && iBlock0.y >= srcBlock.y);
    var collide1 = (iBlock1.points[0].x < srcBlock.points[srcPt].x && iBlock1.points[1].x >= srcBlock.points[srcPt].x && iBlock1.y >= srcBlock.y);
    var line = [];


    var touch0 = (srcBlock.points[srcPt].y == iBlock0.points[0].y && iBlock0.points[0].x <= srcBlock.points[srcPt].x && iBlock0.points[1].x >= srcBlock.points[srcPt].x);
    var touch1 = (srcBlock.points[srcPt].y == iBlock1.points[0].y && iBlock1.points[0].x <= srcBlock.points[srcPt].x && iBlock1.points[1].x >= srcBlock.points[srcPt].x);

    if (touch0 || touch1) {
        return [];
    }



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
    var collide0 = (iBlock0.y < srcBlock.y && iBlock0.points[2].x <= srcBlock.points[srcPt].x && iBlock0.points[3].x >= srcBlock.points[srcPt].x );
    var collide1 = (iBlock1.y < srcBlock.y && iBlock1.points[2].x <= srcBlock.points[srcPt].x && iBlock1.points[3].x >= srcBlock.points[srcPt].x );

    var touch0 = (srcBlock.y == iBlock0.points[2].y && iBlock0.points[2].x <= srcBlock.points[srcPt].x && iBlock0.points[3].x >= srcBlock.points[srcPt].x);
    var touch1 = (srcBlock.y == iBlock1.points[2].y && iBlock1.points[2].x <= srcBlock.points[srcPt].x && iBlock1.points[3].x >= srcBlock.points[srcPt].x);

    if (touch0 || touch1) {
        return [];
    }

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
    // 3. doesn't hit any obstacles

    var matches = _.filter(CELL_LINES, function(c) {
        return (c[0] > cline[0])
        &&
            ((c[1] == cline[1] && c[3] == cline[3]) ||
              (c[1] == cline[3] && c[3] == cline[1])  
        &&
            (Math.abs((c[0] - cline[0])) <= 300)
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
        &&
            (Math.abs(cline[0] - c[0]) <= 300)
                );
    });

    matches = _.sortBy(matches, function(n) { return -n[0]; });
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

function countProcessed() {
    //build cells that filter missed
    _.forEach(BLOCKS, function(b, bi) {
        _.forEach(b.points, function(p, pi) {

            if (p.y == 0 || p.y == CANVAS_HEIGHT) p.processed += 1;
            _.forEach(CELLS, function(c, ci) {
                if ( (c.left[0] == p.x || c.right[0] == p.x) && 
                      (c.left[1] == p.y ||c.left[3] == p.y)
                    ) { 
                    p.processed += 1;
                }

                

                // special case for ends
                if ( (bi == 0) && (pi == 0 || pi == 2) && (ci == 0)) p.processed += 1;
                if ( (bi == 2) && (pi == 1 || pi == 3) && (ci == 0)) p.processed += 1;

            });
        });

    });

}



function generateCells() {

    _.forEach(BLOCKS, function(b, bi) {
        var blks = _.filter(BLOCKS, function(m) {return m != b;});



        if (b.points[0].y == 0) {
            ptOrigin = 2;
        }
        else {
            ptOrigin = 0;
        }

        if (bi != 0) {
            var up = getLineCoordsUp(b, ptOrigin, blks[0], blks[1]);
            var down = getLineCoordsDown(b, ptOrigin, blks[0], blks[1]);
            var missingCoords = [ up[2], up[3], down[2], down[3], 1 ];

            _.forEach(missingCoords, function(c, i) {
                if (c == undefined) {
                    var pts = b.points[ptOrigin];
                    if (i == 0 || i == 2) c = pts.x;
                    else c = pts.y;

                    missingCoords[i] = c;
                }
            });

            CELL_LINES.push(missingCoords);
        }

        if (b.points[1].y == 0) {
            ptOrigin = 3;
        }
        else {
            ptOrigin = 1;
        }


        if (bi != 2) {
            var up = getLineCoordsUp(b, ptOrigin, blks[0], blks[1]);
            var down = getLineCoordsDown(b, ptOrigin, blks[0], blks[1]);
            var missingCoords = [ up[2], up[3], down[2], down[3] ];

            _.forEach(missingCoords, function(c, i) {
                if (c == undefined) {
                    var pts = b.points[i];
                    if (i == 0 || i == 2) c = pts.x;
                    else c = pts.y;

                }
            });

            CELL_LINES.push(missingCoords);
        }


    });


    var itStart = 0;
    if (LEFT_CELL) {
        itStart += 2;
    }
    if (RIGHT_CELL) {
        itStart += 2;
    }

    for (var i = itStart; i < CELL_LINES.length; i++) {
        if (CELL_LINES[i].length < 5) addCell(CELL_LINES[i]);
    }

    console.log(CELL_LINES);
    var badCells = [];
    _.forEach(CELLS, function(cell) {
        // if cell is bounded by bigger cell, remove it
        var bc = _.filter(CELLS, function(c) {
            var maxYC = min(c.left[1], c.left[3]);
            var minYC = max(c.left[1], c.left[3]);

            var maxYCell = min(cell.left[1], cell.left[3]);
            var minYCell = max(cell.left[1], cell.left[3]);

            return c.left[0] == cell.left[0] && 
            c.right[0] == cell.right[0] &&
            (maxYC == maxYCell || minYC == minYCell);
        });

        if (bc) {
            //get biggest
            var biggestCell = cell;
            _.forEach(bc, function(badCell) {
                if (((badCell.left[0] == BLOCKS[0].x && badCell.right[0] == BLOCKS[0].points[1].x) ||
                                    (badCell.left[0] == BLOCKS[1].x && badCell.right[0] == BLOCKS[1].points[1].x) ||
                                    (badCell.left[0] == BLOCKS[2].x && badCell.right[0] == BLOCKS[2].points[1].x) 
                                    ) &&
                    (Math.abs(badCell.left[1] - badCell.left[3]) == CANVAS_HEIGHT)
                    ) {
                    badCells.push(badCell);
                    return;
                }

                var maxYBad = min(badCell.left[1], badCell.left[3]);
                var minYBad = max(badCell.left[1], badCell.left[3]);

                var maxYBig = min(biggestCell.left[1], biggestCell.left[3]);
                var minYBig = max(biggestCell.left[1], biggestCell.left[3]);

                if (maxYBad < maxYBig && minYBad > minYBig) {
                    biggestCell = badCell;
                }

                badCells = badCells.concat(bc);
                _.remove(badCells, function(bcc) { 
                    return _.isEqual(bcc, biggestCell);
                });
            });
        }

    });

    _.forEach(badCells, function(bc) {
        _.remove(CELLS, function(c) {
            return _.isEqual(c, bc);
        });
    });




    CELLS = _.uniq(CELLS, function(c) {
        return JSON.stringify(c);
    });

    CELLS = _.sortBy(CELLS, function(c) {
        return c.left[0];
    });

    _.forEach(CELLS, function(c, n) {
        _.extend(c, {
            id: n
        });
    });

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
        return b.x + b.size;
    });




    //add leftmost (border + left edge)



    if (BLOCKS[0].points[0].x > 0) {
        CELL_LINES.push([0, top, top, bottom]);
        CELL_LINES.push([BLOCKS[0].points[0].x, top, BLOCKS[0].points[0].x, bottom]);

        CELLS.push({
            left: CELL_LINES[0],
            right: CELL_LINES[1]
        });
        LEFT_CELL = true;
    }

    // add rightmost (border + right edge)

    if (BLOCKS[2].points[3].x < CANVAS_WIDTH) {
        CELL_LINES.push([BLOCKS[2].points[3].x, top, BLOCKS[2].points[3].x, bottom]);
        CELL_LINES.push([CANVAS_WIDTH, top, CANVAS_WIDTH, bottom]);
        if (LEFT_CELL) {
            CELLS.push({
                left: CELL_LINES[2],
                right: CELL_LINES[3]
            });
        } else {
            CELLS.push({
                left: CELL_LINES[0],
                right: CELL_LINES[1]
            });
        }
        RIGHT_CELL = true;
    }

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

        CELL_LINES.push(left);
        CELL_LINES.push(right);      
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


    // Add top CELL_LINES
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

    _.remove(CELL_LINES, function(n) {return n.length == 0;});

    generateCells();


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




}


// Build adjacency matrix from cells
function findAdjacencies() {
     // if right x matches left x, we got an adjacency
    _.forEach(CELLS, function(c) {
        var adjacencyList = [];
        _.forEach(CELLS, function(n, ni) {
            if (c.right[0] == n.left[0] ||
                c.left[0] == n.right[0]
                ) {
                adjacencyList.push(ni);
            }
        });
        _.extend(c, {
            adjacencyList: adjacencyList
        });
    });
    
}


//given a coordinate point, figure out which cell it's in
function findCell(pt) {
    var s = {};

    _.forEach(CELLS, function(c) {

        var maxY = min(c.left[1], c.left[3]);
        var minY = max(c.left[1], c.left[3]);

        if ((pt.x >= c.left[0] && pt.x < c.right[0]) && 
            (pt.y >= maxY && pt.y < minY)) {
            s = c;
        }
    });

    return s;

}

function recursiveDFS(node, end) {
    _.extend(node,{visited: true});

    var testEnd = _.find(node.adjacencyList, function(n) {return n == end;});


   _.forEach(node.adjacencyList, function(adj) {
       if (!CELLS[adj].visited) {
            CELLS[adj].parent.push(node.id);
            recursiveDFS(CELLS[adj], end);
       }
   });
}


function cellDFS(start, end) {
    var path = [];

    //Graph Init
    _.forEach(CELLS, function(c) {
        if (c != start) _.extend(c, { visited: false});
        else _.extend(c, {visited: true});

        _.extend(c, {
            parent: []
        });

    });

    recursiveDFS(start, end.id);

    var solution = [];
    var tmpCell = end;


    do  {
        solution.push(tmpCell.id);
        tmpCell = CELLS[tmpCell.parent];
    } while (tmpCell != start);
    solution.reverse();



        var sn = document.getElementById("solution");
        sn.innerHTML += "SOLUTION : " + solution.join(" -> ");


    return solution;
}


//Use some sort of search algorithm to find a solution
function searchGraph() {

    var start_cell = findCell(START_POINT);
    var end_cell = findCell(END_POINT);

    if (start_cell == end_cell) {
        return [];
    }
    else return cellDFS(start_cell, end_cell);
}

function getDirection(start, end) {
    if (start.right[0] == end.left[0]) {
        //right
        return {
            direction:1,
            coord:end.left,
        };
    }
    else {
        //left
        return {
            direction:0,
            coord:end.right,
        };
    }
}

function overOrUnder(start, end) {
    var endY = [end[1], end[3]];
    var bottomEnd = _.max(endY);
    var topEnd = _.min(endY);

    if (start.y < topEnd) {
        return "over";
    }
    else if (start.y > bottomEnd) {
        return "under";
    }
    else {
        return "fine";
    }




}

// Render the solution to the canvas
function drawSolution(solution) {
    POINTS.push(START_POINT);
    var currentCell = findCell(START_POINT);
    var current_pt = _.clone(START_POINT, true);

    _.forEach(solution, function(s) {
        //go through solution, get the next cell "gate", align with it
        var orientation = getDirection(currentCell, CELLS[s]);
        var direction = orientation.coord;

        var vertical = overOrUnder(current_pt, orientation.coord);
        if (vertical == "over") {
            current_pt.y += (direction[3] - current_pt.y - ((direction[3] - direction[1]) / 2));
        }
        else if (vertical == "under") {
            current_pt.y -= (direction[3] + current_pt.y + ((direction[3] - direction[1]) / 2));      
        }

        if (orientation.direction == 1) {
            //right
            current_pt.x += dist(current_pt.x, current_pt.y, direction[0], current_pt.y);
        }
        else {
            //left
            current_pt.x -= dist(current_pt.x, current_pt.y, direction[0], current_pt.y);
        }

        POINTS.push(_.clone(current_pt, true));
        currentCell = CELLS[s];

    });

    POINTS.push(END_POINT);

    redraw();


}


function solve() {
    subDivide();
    drawCells();
    findAdjacencies();

    var solution = searchGraph();
    drawSolution(solution);
}


