var CANVAS_HEIGHT = 500;
var CANVAS_WIDTH = 500;
var POINTS = [];

var CELLS = [];

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
		x:160,
		y:210
	},
	{
		id:"block-3",
		size:100,
		x:201,
		y:380
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
    drawCells();

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
    for (var i = 0; i < CELLS.length; i++) {
	line(CELLS[i].left[0], CELLS[i].left[1], CELLS[i].left[2], CELLS[i].left[3]);
	line(CELLS[i].right[0], CELLS[i].right[1], CELLS[i].right[2], CELLS[i].right[3]);
    }
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


function divideTopOverlap(overlap, divideBlock, otherBlock) {
    var newCell = [];
    if (overlap == "right") {

        if (BLOCKS[divideBlock].points[1].processed < 2) {
            newCell.push({
                left: [BLOCKS[otherBlock].points[2].x, BLOCKS[otherBlock].points[2].y, BLOCKS[otherBlock].points[2].x, BLOCKS[divideBlock].points[0].y],
                right: [BLOCKS[divideBlock].points[1].x, BLOCKS[divideBlock].points[1].y, BLOCKS[divideBlock].points[1].x, BLOCKS[otherBlock].points[2].y ]
            });
            BLOCKS[divideBlock].points[1].processed += 1;
            BLOCKS[otherBlock].points[2].processed += 1;
        }

        if (BLOCKS[divideBlock].points[0].processed < 2) {
            newCell.push({
                left: [BLOCKS[divideBlock].points[0].x, BLOCKS[divideBlock].points[0].y, BLOCKS[divideBlock].points[0].x, 0],
                right: [BLOCKS[otherBlock].points[2].x, BLOCKS[divideBlock].points[1].y, BLOCKS[otherBlock].points[2].x, 0]
            });

            BLOCKS[divideBlock].points[0].processed += 1;
            BLOCKS[otherBlock].points[2].processed += 1;
        }


    }
    else if (overlap == "left") {

        if (BLOCKS[divideBlock].points[0].processed < 2) {
            newCell.push({
                left: [BLOCKS[divideBlock].points[0].x, BLOCKS[divideBlock].points[0].y, BLOCKS[divideBlock].points[0].x, BLOCKS[otherBlock].points[3].y],
                right: [ BLOCKS[otherBlock].points[3].x, BLOCKS[otherBlock].points[3].y, BLOCKS[otherBlock].points[3].x, BLOCKS[divideBlock].points[1].y]
            });
            BLOCKS[divideBlock].points[0].processed += 1;
            BLOCKS[otherBlock].points[3].processed += 1;
        }
        if (BLOCKS[otherBlock].points[1].processed < 2) {
            newCell.push({
                left: [BLOCKS[otherBlock].points[1].x, BLOCKS[divideBlock].points[1].y, BLOCKS[otherBlock].points[1].x, 0],
                right: [BLOCKS[divideBlock].points[1].x, BLOCKS[divideBlock].points[1].y, BLOCKS[divideBlock].points[1].x, 0]
            });
            BLOCKS[otherBlock].points[1].processed += 1;
            BLOCKS[divideBlock].points[1].processed += 1;
        }

    }
    else if (overlap == "both") {
        if (BLOCKS[divideBlock].points[0].processed < 2) {
            newCell.push({
                left: [ BLOCKS[divideBlock].points[0].x, BLOCKS[divideBlock].points[1].y, BLOCKS[divideBlock].points[0].x, BLOCKS[otherBlock].points[2].y ],
                right: [ BLOCKS[divideBlock].points[1].x, BLOCKS[divideBlock].points[1].y, BLOCKS[divideBlock].points[1].x, BLOCKS[otherBlock].points[2].y]
            });
            BLOCKS[divideBlock].points[0].processed += 1;
            BLOCKS[divideBlock].points[1].processed += 1;
        }

    }
    addNewCells(newCell);
}



function divideTop(divideBlock, otherBlock0, otherBlock1) {

    // If block is against the top, no top cell needs to be drawn
    if (divideBlock.y == 0) {
        return;
    }

    overlap0 = isOverlap(BLOCKS[divideBlock], BLOCKS[otherBlock0], "under");
    overlap1 = isOverlap(BLOCKS[divideBlock], BLOCKS[otherBlock1], "under");
    var newCell = [];
    if (!overlap0 && !overlap1) {
        // No overlapping, push new cell that extends to the top

        newCell.push({
            left: [ BLOCKS[divideBlock].points[0].x, BLOCKS[divideBlock].points[0].y, BLOCKS[divideBlock].points[0].x, 0],
            right: [ BLOCKS[divideBlock].points[1].x, BLOCKS[divideBlock].points[1].y, BLOCKS[divideBlock].points[1].x, 0]
        });

        BLOCKS[divideBlock].points[0].processed += 1;
        BLOCKS[divideBlock].points[1].processed += 1;
        addNewCells(newCell);
    }

    else if (overlap0 && overlap1) {
    // Both overlap 


    }
    else if (overlap0) {
        divideTopOverlap(overlap0, divideBlock, otherBlock0);
    }
    else if (overlap1) {
        // Only block 1 is overlapping
        divideTopOverlap(overlap1, divideBlock, otherBlock1);
    }
    
}



function divideBottom(divideBlock, otherBlock0, otherBlock1) {
    


}

function generatePoints(block) {
    return _.extend(block, {
        "points": [
            {
                x: block.x,
                y: block.y,
                processed: 0
            },
            {
                x: block.x + block.size,
                y: block.y,
                processed: 0
            },
            {
                x: block.x,
                y: block.y + block.size,
                processed: 0
            },
            {
                x: block.x + block.size,
                y: block.y + block.size,
                processed: 0
            },
        ]
    });
}


function checkProcessed() {
    _.forEach(CELLS, function(c) {

    });
}

// Divide region into cells
// Push barriers on for each block
// Push barriers for the distance between each block
function subDivide() {

    _.forEach(BLOCKS, function(b) {
        b = generatePoints(b);
    });


    divideTop(0, 1, 2);
    divideTop(1, 2, 0);
    divideTop(2, 0, 1);
    console.log(BLOCKS);
    // checkProcessed();

    // divideBottom(BLOCKS[0], BLOCKS[1], BLOCKS[2]);
    // divideBottom(BLOCKS[1], BLOCKS[2], BLOCKS[0]);
    // divideBottom(BLOCKS[2], BLOCKS[1], BLOCKS[0]);

    console.log(CELLS);
    window.setTimeout(function() {
	var lf = document.getElementById("left");
	var rt = document.getElementById("right");
	_.forEach(CELLS, function(c) {
	    lf.innerHTML += "(" + c.left[0] + ", " + c.left[1] + ") - (" + c.left[2] + ", " + c.left[3] + ") <br>";
	    rt.innerHTML += "(" + c.right[0] + ", " + c.right[1] + ") - (" + c.right[2] + ", " + c.right[3] + ") <br>";
	});
    }, 1500);




}
subDivide();

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
