let rockimg;
let paperimg;
let scissorsimg;

let sizeSlider;
let speedSlider;

let objs = [];
let types = ["rock", "paper", "scissors"];

let num = 30;
let size = 50;
let speed = 5;

let rocks = num;
let papers = num;
let scissors = num;

function preload() {
    rockimg = loadImage('rock.png');
    paperimg = loadImage('paper.png');
    scissorsimg = loadImage('scissors.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i=0;i<num;i++) {
        const obj = {
            type: "rock",
            x: random(width),
            y: random(height),
            xdir: random(speed * -1, speed),
            ydir: random(speed * -1, speed)
        }

        objs.push(obj);
    }

    for (let i=0;i<num;i++) {
        const obj = {
            type: "paper",
            x: random(width),
            y: random(height),
            xdir: random(speed * -1, speed),
            ydir: random(speed * -1, speed)
        }

        objs.push(obj);
    }

    for (let i=0;i<num;i++) {
        const obj = {
            type: "scissors",
            x: random(width),
            y: random(height),
            xdir: random(speed * -1, speed),
            ydir: random(speed * -1, speed)
        }

        objs.push(obj);
    }

    sizeSlider = createSlider(20, 100, 50);
    sizeSlider.position(windowWidth - 120, 10);
    sizeSlider.style('width', '100px');

    speedSlider = createSlider(1, 10, 3);
    speedSlider.position(windowWidth - 120, 40);
    speedSlider.style('width', '100px');
}

function draw() {
    background(0);

    size = sizeSlider.value();
    speed = speedSlider.value();

    for (let i=0;i<num * 3;i++) {
        if (objs[i].type == "rock") image(rockimg, objs[i].x, objs[i].y, size, size);
        else if (objs[i].type == "paper") image(paperimg, objs[i].x, objs[i].y, size, size);
        else if (objs[i].type == "scissors") image (scissorsimg, objs[i].x, objs[i].y, size, size);
        
        objs[i].x += objs[i].xdir;
        objs[i].y += objs[i].ydir;

        checkBoundaries(objs[i]);
        checkCollisions(objs[i], i);
    }

    textSize(32);
    text("Rock: " + rocks, 10, 30);
    text("Paper: " + papers, 10, 60);
    text("Scissors: " + scissors, 10, 90);

    text("Size: ", width - 230, 30);
    text("Speed: ", width - 230, 60);
    fill(255);
}

function checkBoundaries(obj) {
    if (obj.x > width - size) obj.xdir = random(speed * -1, 0);
    else if (obj.x < 0) obj.xdir = random(0, speed);

    if (obj.y > height - size) obj.ydir = random(speed * -1, 0);
    else if (obj.y < 0) obj.ydir = random(0, speed);
    
}

function checkCollisions(obj, ind) {
    rocks = 0;
    papers = 0;
    scissors = 0;
    for (let i=0;i<num * 3;i++) {
        if (objs[i].type == "rock") rocks++;
        else if (objs[i].type == "paper") papers++;
        else scissors++;

        if (i == ind) continue;

        if (obj.x < objs[i].x + size && obj.x + size > objs[i].x && obj.y < objs[i].y + size && obj.y + size > objs[i].y) {
            if (obj.x > objs[i].x) obj.xdir = random(0, speed);
            else obj.xdir = random(speed * -1, 0);

            if (obj.y > objs[i].y) obj.ydir = random(0, speed);
            else obj.ydir = random(speed * -1, 0);

            if (obj.type == "rock") {
                if (objs[i].type == "paper") obj.type = "paper";
                else if (objs[i].type == "scissors") objs[i].type = "rock";
            }
            else if (obj.type == "paper") {
                if (objs[i].type == "rock") objs[i].type == "paper";
                else if (objs[i].type == "scissors") obj.type = "scissors";
            }
            else if (obj.type == "scissors") {
                if (objs[i].type == "rock") obj.type == "rock";
                else if (objs[i].type == "paper") objs[i].type == "scissors";
            }
        }
    }
}