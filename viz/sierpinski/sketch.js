let points = [];

function setup() {
    points.push([windowWidth / 2, windowHeight / 4]);
    points.push([windowWidth / 3, 2 * windowHeight / 3]);
    points.push([2 * windowWidth / 3, 2 * windowHeight / 3]);


    createCanvas(windowWidth - 20, windowHeight - 20);
    points.push([random(width), random(height)]);
}

function draw() {
    background(0);
    stroke(255);
    strokeWeight(3);

    for (let i = 0;i<points.length;i++) {
        point(points[i][0], points[i][1]);
    }
}