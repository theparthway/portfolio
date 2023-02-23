function Pot(x, y) {
    this.x = x;
    this.y = y;
    this.w = 90;
    this.h = 120;
    this.toDelete = false;
    let img = loadImage('assets/pot.jpg');

    this.move = function() {
        this.x += random(-1, 1);
        this.y += random(-1, 1);
    }

    this.rem = function() {
        this.toDelete = true;
    }

    this.show = function() {
        image(img, this.x, this.y, this.w, this.h);
    }
}