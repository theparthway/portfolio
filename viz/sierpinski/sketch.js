let points = [];
let newPoint;

let triangleHeight, triangleTop, triangleBase, triangleLeft, triangleRight, triangleBottom;
let coords = [];

function setup() {
    createCanvas(windowWidth, windowHeight); // Set the canvas size to fit the whole window
    triangleHeight = windowHeight * 0.75; // Adjust the height as needed
    triangleTop = windowHeight * 0.1; // Adjust the top position as needed
    triangleBase = triangleHeight / (sqrt(3) / 2);
    triangleLeft = (windowWidth - triangleBase) / 2;
    triangleRight = triangleLeft + triangleBase;
    triangleBottom = triangleTop + triangleHeight;

    coords.push(createVector((triangleRight +triangleLeft) / 2, triangleTop));
    coords.push(createVector(triangleLeft, triangleBottom));
    coords.push(createVector(triangleRight, triangleBottom));

    newPoint = generateRandomPointInTriangle(triangleLeft, triangleBottom, triangleRight, triangleBottom, (triangleLeft + triangleRight) / 2, triangleTop);
    points.push(newPoint);
  }
  
function draw() {
    background(220);

    textSize(32);
    text("No of points: " + points.length, 0, 32);
    textSize(11);
    text("The program initially picks a random point inside the triangle, ", windowWidth / 3, 16);
    text("then iteratively draws new points in the midpoints of the latest drawn point and a randomly chosen vertex of the triangle", windowWidth / 3, 32);

    for (let i=0;i<coords.length;i++) {
        strokeWeight(10);
        fill(255, 0, 0);
        point(coords[i].x, coords[i].y);
    }

    fill(0, 0, 255);

    strokeWeight(3);

    for (let i=0;i<points.length;i++) {
        point(points[i].x, points[i].y);
    }

    coord = coords[(Math.floor(Math.random() * coords.length))];
    newPoint = createVector((newPoint.x + coord.x) / 2, (newPoint.y + coord.y) / 2);
    points.push(newPoint);
}

function generateRandomPointInTriangle(x1, y1, x2, y2, x3, y3) {
    // Generate random barycentric coordinates
    let r1 = random();
    let r2 = random();

    // Check that the point is inside the triangle
    if (r1 + r2 > 1) {
    r1 = 1 - r1;
    r2 = 1 - r2;
    }

    // Calculate the point's coordinates using barycentric interpolation
    let x = x1 * r1 + x2 * r2 + x3 * (1 - r1 - r2);
    let y = y1 * r1 + y2 * r2 + y3 * (1 - r1 - r2);

    return createVector(x, y);
}
  
  // Adjust canvas size when the window is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
  