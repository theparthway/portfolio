function removeFromArray(arr, elem) {
    for (let i=arr.length - 1;i>=0;i--) {
        if (arr[i] == elem) {
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b) {
    let d = dist(a.x, a.y, b.x, b.y);
    return d;
}

let cols = 50;
let rows = 50;
let grid = new Array(cols);

let openset = [];
let closedset = [];
let start;
let end;
let current;

let text;
let stat;
let openNodes;
let closedNodes;
let totalNodes;

let startButton;
let resetButton;

let size;
let w;
let h;
let path = [];

function Spot(x, y) {
    this.x = x;
    this.y = y;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbours = [];
    this.previous = undefined;
    this.wall = false;

    if (random(1) < 0.3) {
        this.wall = true;
    }

    this.show = function(colour) {
        fill(colour);
        if (this.wall) {
            fill(0);
        }
        noStroke();
        ellipse(this.x * w + w/2, this.y * h + h/2, w / 2, h / 2);
    }

    this.addNeighbours = function(grid) {
        if (x < cols - 1) this.neighbours.push(grid[this.x + 1][this.y]);
        if (x > 0) this.neighbours.push(grid[this.x - 1][this.y]);
        if (y < rows - 1) this.neighbours.push(grid[this.x][this.y + 1]);
        if (y > 0) this.neighbours.push(grid[this.x][this.y - 1]);
        
        // diagonals
        if (x > 0 && y > 0) this.neighbours.push(grid[x - 1][y - 1]);
        if (x < cols - 1 && y > 0) this.neighbours.push(grid[x + 1][y - 1]);
        if (x > 0 && y < rows - 1) this.neighbours.push(grid[x - 1][y + 1]);
        if (x < cols - 1 && y < rows - 1) this.neighbours.push(grid[x + 1][y + 1]);
    }
}


function setup() {
    size = min(windowWidth, windowHeight);
    
    let cnv = createCanvas(size, size);
    cnv.position((windowWidth - size) / 2, (windowHeight - size) / 2);
    
    startButton = createButton("Start");
    startButton.position(0, windowHeight / 2 - 150);
    startButton.mousePressed(startAlgo);

    resetButton = createButton("Reset");
    resetButton.position(100, windowHeight / 2 - 150);
    resetButton.mousePressed(resetGrid);

    w = size / cols;
    h = size / rows;
    
    stat = createP("Status: Processing...");
    stat.style('fontSize', '1.5rem');
    stat.position(0, windowHeight / 2 - 100);

    text = createP("Reload for new maze");
    text.style('fontSize', '1.5rem');
    text.position(0, windowHeight / 2 - 50);

    openNodes = createP("Open nodes: ");
    openNodes.style('fontSize', '1.5rem');
    openNodes.position(0, windowHeight / 2);
    
    closedNodes = createP("Closed nodes: ");
    closedNodes.style('fontSize', '1.5rem');
    closedNodes.position(0, windowHeight / 2 + 50);

    totalNodes = createP("Total nodes: ");
    totalNodes.style('fontSize', '1.5rem');
    totalNodes.position(0, windowHeight / 2 + 100);


    // 2d array
    for (let i=0;i<rows;i++) {
        grid[i] = new Array(cols);
    }

    // initializing heuristic values
    for (let i=0;i<rows;i++) {
        for (let j=0;j<cols;j++) {
            grid[i][j] = new Spot(i, j);
        }
    }

    for (let i=0;i<rows;i++) {
        for (let j=0;j<cols;j++) {
            grid[i][j].addNeighbours(grid);
        }
    }

    start = grid[0][0];
    end = grid[rows - 1][cols - 1];
    start.wall = false;
    end.wall = false;

    // starting openset with one node = start node
    openset.push(start);
}

function resetGrid() {
    for (let i=0;i<rows;i++) {
        for (let j=0;j<cols;j++) {
            grid[i][j].wall = false;
            openset = [];
            closedset = [];
            path = [];
            stat.html("Ready to start");
        }
    }

    start = grid[0][0];
    end = grid[rows - 1][cols - 1];
    start.wall = false;
    end.wall = false;

    openset.push(start);
}

function mousePressed() {
    if (mouseX >= 0 && mouseX < size && mouseY >= 0 && mouseY < size) {
        let i = floor(mouseX / w);
        let j = floor(mouseY / h);
        grid[i][j].wall = !grid[i][j].wall;
    }
}

function startAlgo() {
    openset = [start];
    closedset = [];
    path = [];

    stat.html("Status: Processing...");

    loop();
}

function draw() {

    openNodes.html("Open nodes: " + openset.length);
    closedNodes.html("Closed nodes: " + closedset.length);
    totalNodes.html("Total nodes: " + rows * cols);

    if (openset.length > 0) {
        // keep going

        let winner = 0;
        for (let i=0;i<openset.length;i++) {
            if (openset[i].f < openset[winner].f) {
                winner = i;
            }
        }

        current = openset[winner];

        if (current === end) {
            noLoop();
            // console.log("done");
            stat.html("Status: Done");
        }
        
        removeFromArray(openset, current);
        closedset.push(current);
        
        for (let i=0;i<current.neighbours.length;i++) {
            let neighbour = current.neighbours[i];
            if (!closedset.includes(neighbour) && !neighbour.wall) {
                let tempg = current.g + 1;
                
                let newPath = false;
                if (openset.includes(neighbour)) {
                    if (tempg < neighbour.g) {
                        neighbour.g = tempg;
                        newPath = true;
                    }
                } else {
                    neighbour.g = tempg;
                    newPath = true;
                    openset.push(neighbour);
                }
                
                if (newPath) {
                    neighbour.h = heuristic(neighbour, end);
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.previous = current;
                }
            }
        }
        
    } else {
        // no solution
        // console.log("no solution");
        stat.html("Status: No solution");
        noLoop();
        return;
    }
    
    background(255);
    
    for (let i=0;i<rows;i++) {
        for (let j=0;j<cols;j++) {
            grid[i][j].show(color(255));
        }
    }
    
    for (let i=0;i<closedset.length;i++) {
        closedset[i].show(color(255,0,0));
    }
    
    for (let i=0;i<openset.length;i++) {
        openset[i].show(color(0,255,0));
    }
    
    // find the path
    path = [];
    let temp = current;
    path.push(temp);

    while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }

    noFill();
    stroke(255, 0, 200);
    strokeWeight(w / 2);
    beginShape();
    for (let i=0;i<path.length;i++) {
        vertex(path[i].x * w + w/2, path[i].y * h + h/2);
    }
    endShape();
}