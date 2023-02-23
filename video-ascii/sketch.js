// const density = "Ñ@#W$9876543210?!abc;:+=-,._                ";

let video;
let asciiDiv;
// brightness
// size
let brightSlider;
let sizeSlider;
let size = 64;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(size, (size / 4) * 3);
  brightSlider = createSlider(0, 100, 2, 1);
  brightSlider.style('width', `${windowWidth - 10}px`);
  asciiDiv = createDiv();
}

function draw() {
  let density = "Ñ@#W$9876543210?!abc;:+=-,._";
  for (let i=0;i<brightSlider.value();i++) {
    density += " ";
  }
  textSize(32);
text('word', 10, 300);
fill(0, 102, 153);
text('word', 10, 600);
fill(0, 102, 153, 51);
text('word', 10, 900);
  video.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));
      const c = density.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += '<br/>';
  }
  if (windowWidth < 600) asciiDiv.style('font-size', '2.5vw');
  asciiDiv.html(asciiImage);
}