let r;
let pi = 0;
let recordPi = 0;
let slider;

function setup() {
    r = min(windowWidth, windowHeight - 100)
    createCanvas(r, r);
    background(51);
    stroke(255);
    noFill();
    circle(width / 2, height / 2, r);

    slider = createSlider(1, 10, 5);
    slider.position(windowWidth - 100, 0);
    slider.style('width', '100px');
}

let cir = 0;
let total = 0;
function draw() {

    pi = cir / total * 4;
    let recordDiff = abs(PI - recordPi);
    let diff = abs(PI - pi);
    select(".real").html("Pi (real time): " + pi);

    if (diff < recordDiff) {
        recordDiff = diff;
        recordPi = pi;
        select(".pin").html("Pi (high score): " + pi);
        select(".error").html("Error: " + recordDiff);
    }

    stroke(255);
    strokeWeight(2);
    
    for (let i=0;i<slider.value();i++) {
        let x = random(r);
        let y = random(r);
        point(x, y);
        
        if (dist(x, y, width / 2, height / 2) < r / 2) {
            cir++;
        }
        total++;
    }
    
}