let cubies = [...Array(6)].map(e => Array(9));
const N = 3;

let cam;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL).elt.oncontextmenu = () => false;

    cam = createEasyCam({ distance: 600 });

    for (let face = 0;face<6;face++) {
        for (let pos = 0;pos<9;pos++) {
            let cubie = new Cubie(face, pos);
            cubies[face][pos] = cubie;
        }
    }
}

function draw() {
    background(220);

    for (let face = 0;face<6;face++) {
        for (let pos = 0;pos<9;pos++) {
            cubies[face][pos].display();
        }
    }

}

function keyTyped() {
    console.log("pressed");
    if (key == 'u') {
        cubies[1][0].move(2, 0);
        cubies[2][0].move(3, 0);
        cubies[3][0].move(4, 0);
        cubies[4][0].move(1, 0);
    }
}