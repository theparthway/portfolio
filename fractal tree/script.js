var angle;
var trunk;
var thick;
var red;
var green;
var blue;
var angleSlider;
var trunkSlider;
var thickSlider;
var redSlider;
var greenSlider;
var blueSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleSlider = createSlider(0, TWO_PI, PI / 4, 0.01);
  trunkSlider = createSlider(0, 600, 250, 0.1);
  thickSlider = createSlider(0, 5, 1.5, 0.01);
  redSlider = createSlider(0, 255, 255, 1);
  greenSlider = createSlider(0, 255, 255, 1);
  blueSlider = createSlider(0, 255, 255, 1);
}

function draw() {
  background(0);
  angle = angleSlider.value();
  angleSlider.position(20, 70);
  angleSlider.style('width', `${windowWidth / 3 - 40}px`);
  trunk = trunkSlider.value();
  trunkSlider.position(windowWidth / 3, 70);
  trunkSlider.style('width', `${windowWidth / 3 - 40}px`);
  thick = thickSlider.value();
  thickSlider.position(windowWidth / 3 * 2, 70);
  thickSlider.style('width', `${windowWidth / 3 - 40}px`);
  red = redSlider.value();
  redSlider.position(20, 120);
  redSlider.style('width', `${windowWidth / 3 - 40}px`);
  green = greenSlider.value();
  greenSlider.position(windowWidth / 3, 120);
  greenSlider.style('width', `${windowWidth / 3 - 40}px`);
  blue = blueSlider.value();
  blueSlider.position(windowWidth / 3 * 2, 120);
  blueSlider.style('width', `${windowWidth / 3 - 40}px`);
  textSize(windowWidth / 60);
  noStroke();
  textFont('Helvetica');
  text("FRACTAL TREE", windowWidth / 3 + windowWidth / 9, 35);
  textSize(windowWidth / 70);
  fill(240);
  text("Angle: " + angle + "°", 20, 65);
  text("Trunk: " + trunk + " pixels", windowWidth / 3, 65);
  text("Thickness: " + thick + " pixels", windowWidth / 3 * 2, 65);
  fill(255, 0, 0);
  text("Red: " + red, 20, 115);
  fill(0, 255, 0);
  text("Green: " + green, windowWidth / 3, 115);
  fill(173, 216, 255);
  text("Blue: " + blue, windowWidth / 3 * 2, 115);
  fill(255);
  stroke(red, green, blue);
  strokeWeight(thick);
  translate(width / 2, height);
  branch(trunk);
}

function branch(trunk) {
  line(0, 0, 0, -trunk);
  translate(0, -trunk);
  if (trunk > 4) {
    push();
    rotate(angle);
    branch(trunk * 0.67);
    pop();
    push();
    rotate(-angle);
    branch(trunk * 0.67);
    pop();
  }
}