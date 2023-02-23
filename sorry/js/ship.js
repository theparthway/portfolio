function Ship() {
    this.x = width / 2;
    this.dir = 0;
    let img = loadImage('assets/ship.PNG');

    this.show = function() {
        imageMode(CENTER);
        image(img, this.x, height - 60, 90, 120);
    }

    this.setDir = function(dir) {
        this.dir = dir;
    }

    this.move = function() {
        this.x += this.dir * 10;
    }
}