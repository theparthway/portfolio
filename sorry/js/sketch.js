let ship;
let score = 0;
let pots = [];
let bullets = [];

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);
    ship = new Ship();
    for (let i = 0;i<5;i++) {
        pots[i] = new Pot(random(50, width - 50), random(100, height - 300));
    }
}

function draw() {
    background(18, 61, 39);
    textSize(32);
    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    text('Shoot me!', width / 2, 30);
    textSize(16);
    text('arrow keys to move, spacebar to shoot', width / 2, 60);
    textSize(160);
    textAlign(CENTER, CENTER);
    text(`${score}`, width / 2, height / 2);
    ship.show();
    ship.move();
    for (let i=0;i<bullets.length;i++) {
        bullets[i].show();
        bullets[i].move();

        for (let j = 0;j<pots.length;j++) {
            if (bullets[i].hits(pots[j])) {
                pots[j].rem();
                bullets[i].rem();
                score++;
            }
        }
    }
    for (let i = 0;i<pots.length;i++) {
        pots[i].show();
        pots[i].move();
    }

    for (let i=0;i<bullets.length;i++) {
        if (bullets[i].toDelete) {
            bullets.splice(i, 1);
        }
    }

    for (let i=0;i<pots.length;i++) {
        if (pots[i].toDelete) {
            pots.splice(i, 1);
            let pot = new Pot(random(50, width - 50), random(100, height - 300));
            pots.push(pot);
        }
    }
}

function keyReleased() {
    if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) ship.setDir(0);
}

function keyPressed() {
    if (key == ' ') {
        let bullet = new Bullet(ship.x, height);
        bullets.push(bullet);
    }

    if (keyCode == RIGHT_ARROW) {
        ship.setDir(1);
    } else if (keyCode == LEFT_ARROW) {
        ship.setDir(-1);
    }
}