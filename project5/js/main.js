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
		x:150,
		y:250
	},
	{
		id:"block-3",
		size:100,
		x:400,
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


function divideTop(divideBlock, otherBlock0, otherBlock1) {

    // If block is against the top, no top cell needs to be drawn
    if (divideBlock.y == 0) {
	return;
    }

    overlap0 = isOverlap(divideBlock, otherBlock0, "under");
    overlap1 = isOverlap(divideBlock, otherBlock1, "under");
    if (!overlap0 && !overlap1) {
	// No overlapping, push new cell that extends to the top
	var newCell = {
	    left: [divideBlock.x, divideBlock.y, divideBlock.x, 0],
	    right: [divideBlock.x + divideBlock.size, divideBlock.y, divideBlock.x + divideBlock.size, 0]
	};
	CELLS.push(newCell);
    }
    if (overlap0 && overlap1) {
	// Both overlap 


    }
    if (overlap0) {
	// Only Block 0 is overlapping
	if (overlap0 == "right") {
	    newCell.push( {
		left: [otherBlock1.x, divideBlock.y, otherBlock1.x, otherBlock1.y + otherBlock1.size],
		right: [ divideBlock.x + divideBlock.size, divideBlock.y, divideBlock.x + divideBlock.size, otherBlock1.y + otherBlock1.size ],
	    });

	    newCell.push( {
		left: [ divideBlock.x, divideBlock.y, divideBlock.x, 0 ],
		right: [ otherBlock1.x, divideBlock.y, otherBlock1.x, 0]
	    });


	}
	else if (overlap0 == "left") {
	    newCell.push( {
		left: [ divideBlock.x, divideBlock.y, divideBlock.x, otherBlock0.y + otherBlock0.size ],
		right: [otherBlock0.x + otherBlock0.size, divideBlock.y, otherBlock0.x + otherBlock0.size, otherBlock0.y + otherBlock0.size]
	    });

	    newCell.push( {
		left: [ otherBlock0.x, divideBlock.y, otherBlock0.x, 0 ],
		right: [ divideBlock.x + divideBlock.size, divideBlock.y, divideBlock.x + divideBlock.size, 0]
	    });

	}
	else if (overlap0 == "both") {
	    newCell.push( {
		left: [ divideBlock.x, divideBlock.y, divideBlock.x , otherBlock0.y ],
		right: [ divideBlock.x + divideBlock.size, divideBlock.y, divideBlock.x + divideBlock.size, otherBlock0.y]
	    });
	}
	_.forEach(newCell, function(c) {
	    if ( ! (_.find(CELLS, function(c) { 
		return (_.isEqual(c.left, newCell.left) && _.isEqual(c.right, newCell.right)); 
	    }))) {
		CELLS.push(c);
	    }
	});

    }
    if (overlap1) {
	// Only block 1 is overlapping
	var newCell = [];
	if (overlap1 == "right") {
	    newCell.push( {
		left: [otherBlock1.x, divideBlock.y, otherBlock1.x, otherBlock1.y + otherBlock1.size],
		right: [ divideBlock.x + divideBlock.size, divideBlock.y, divideBlock.x + divideBlock.size, otherBlock1.y + otherBlock1.size ],
	    });

	    newCell.push( {
		left: [ divideBlock.x, divideBlock.y, divideBlock.x, 0 ],
		right: [ otherBlock1.x, divideBlock.y, otherBlock1.x, 0]
	    });


	}
	else if (overlap1 == "left") {
	    newCell.push( {
		left: [ divideBlock.x, divideBlock.y, divideBlock.x, otherBlock1.y + otherBlock1.size ],
		right: [otherBlock1.x + otherBlock1.size, divideBlock.y, otherBlock1.x + otherBlock1.size, otherBlock1.y + otherBlock1.size]
	    });

	    newCell.push( {
		left: [ otherBlock1.x, divideBlock.y, otherBlock1.x, 0 ],
		right: [ divideBlock.x + divideBlock.size, divideBlock.y, divideBlock.x + divideBlock.size, 0]
	    });

	}
	else if (overlap1 == "both") {
	    newCell.push( {
		left: [ divideBlock.x, divideBlock.y, divideBlock.x , otherBlock1.y ],
		right: [ divideBlock.x + divideBlock.size, divideBlock.y, divideBlock.x + divideBlock.size, otherBlock1.y]
	    });
	}
	_.forEach(newCell, function(c) {
	    if ( ! (_.find(CELLS, function(c) { 
		return (_.isEqual(c.left, newCell.left) && _.isEqual(c.right, newCell.right)); 
	    }))) {
		CELLS.push(c);
	    }
	});
    }
}



function divideBottom(divideBlock, otherBlock0, otherBlock1) {
    
    if (divideBlock.y == CANVAS_HEIGHT) {
	return;
    }
    
    overlap0 = isOverlap(divideBlock, otherBlock0, "over");
    overlap1 = isOverlap(divideBlock, otherBlock1, "over");
    if (! overlap0 && ! overlap1) {
	// no bottom overlaps, push a new cell
	var newCell = {
	    left: [ divideBlock.x, divideBlock.y + divideBlock.size, divideBlock.x, CANVAS_HEIGHT ],
	    right: [ divideBlock.x + divideBlock.size, divideBlock.y + divideBlock.size, divideBlock.x + divideBlock.size, CANVAS_HEIGHT ]
	};

	CELLS.push(newCell);
    }

}





// Divide region into cells
// Push barriers on for each block
// Push barriers for the distance between each block
function subDivide() {
    divideTop(BLOCKS[0], BLOCKS[1], BLOCKS[2]);
    divideTop(BLOCKS[1], BLOCKS[2], BLOCKS[0]);
    divideTop(BLOCKS[2], BLOCKS[0], BLOCKS[1]);
    divideBottom(BLOCKS[0], BLOCKS[1], BLOCKS[2]);
    divideBottom(BLOCKS[1], BLOCKS[2], BLOCKS[0]);
    divideBottom(BLOCKS[2], BLOCKS[1], BLOCKS[2]);
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
