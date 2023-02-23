function Bullet(x, y) {
    this.x = x;
    this.y = y;
    this.toDelete = false;

    this.rem = function() {
        this.toDelete = true;
    }

    this.show = function() {
        noStroke();
        fill(150, 0, 255);
        ellipse(this.x, this.y, 16, 16);
    }

    this.move = function() {
        this.y = this.y - 15;
    }

    this.hits = function(pot) {
        if (this.y - 8 < pot.y + pot.h / 2 && this.y - 8 > pot.y - pot.h / 2 && this.x < pot.x + pot.w / 2 && this.x > pot.x - pot.w / 2) return true;
        return false;
    } 
}