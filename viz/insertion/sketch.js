let values = [];
let comparisons = 0;
let buttons = [];
let mode = 1;

let i = 1;
let j = 0;
let key;

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);
    values = new Array(width);
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }
    buttons[0] = createButton('Default View');
    buttons[1] = createButton('Dots View');
    buttons[1].style('color', 'blue');
    buttons[2] = createButton('Spike View');
    buttons[0].position(width / 2 - 100, 40);
    buttons[1].position(width / 2, 40);
    buttons[2].position(width / 2 + 80, 40);
    buttons[0].mousePressed(defa);
    buttons[1].mousePressed(dots);
    buttons[2].mousePressed(spike);
}

function draw() {
    background(0);

    textSize(16);
    fill(255);
    strokeWeight(0.5);
    textAlign(CENTER);
    text('Insertion Sort Visualization', width / 2 + 30, 20);
    textAlign(LEFT, CENTER);
    text('Array Size: ' + width, 10, 20)
    text('Comparisons: ' + comparisons, 10, 40);
    text('Time elapsed: ' + (millis() / 1000), 10, 60);

    if (i < values.length) {
        key = values[i];
        j = i - 1;
        while (j >= 0 && values[j] > key) {
            values[j+1] = values[j];
            j -= 1;
            comparisons++;
        }
        values[j+1] = key;
    } else {
        console.log("finished");
        noLoop();
    }
    i++;

    for (let i = 0; i < values.length; i++) {
        stroke(255);
        strokeWeight(1.5);
        if (mode == 0) line(i, height, i, height - values[i]);
        else if (mode == 1) circle(i, height - values[i], 1);
        else if (mode == 2) {
            let half = values[i] / 2;
            line(i, height/2 - half, i, height/2 + half);
        }
    }
}

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function defa() {
    mode = 0;
    buttons[0].style('color', 'blue');
    buttons[1].style('color', 'black');
    buttons[2].style('color', 'black');
}
function dots() {
    mode = 1;
    buttons[0].style('color', 'black');
    buttons[1].style('color', 'blue');
    buttons[2].style('color', 'black');
}
function spike() {
    mode = 2;
    buttons[0].style('color', 'black');
    buttons[1].style('color', 'black');
    buttons[2].style('color', 'blue');
}