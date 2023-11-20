class Cubie {
    constructor(face, pos) {
        this.face = face;
        this.pos = pos;
        this.color = ""
        this.size = 50;

        this.rowc = Math.floor(this.pos / 3) * this.size + this.size / 2;
        this.colc = (this.pos % 3) * this.size + this.size / 2;

        this.orient();
        this.orientColors();
    }

    orientColors() {
        switch(this.face) {
            case 0:
                this.color = "white";
                break;
            case 1:
                this.color = "red";
                break;
            case 2:
                this.color = "green";
                break;
            case 3:
                this.color = "orange";
                break;
            case 4:
                this.color = "blue";
                break;
            case 5:
                this.color = "yellow";
                break;
        }
    }

    orient() {
        switch (this.face) {
            case 0:
                this.x = this.rowc;
                this.y = 0;
                this.z = this.colc;
                break;
            case 1:
                this.x = 0;
                this.y = this.rowc;
                this.z = this.colc;
                break;
            case 2:
                this.x = this.colc;
                this.y = this.rowc;
                this.z = 0;
                break;
            case 3:
                this.x = this.size * N;
                this.y = this.rowc;
                this.z = this.colc;
                break;
            case 4:
                this.x = this.colc;
                this.y = this.rowc;
                this.z = this.size * N;
                break;
            case 5:
                this.x = this.rowc;
                this.y = this.size * N;
                this.z = this.colc;
                break;
        }

    }
    
    display() {
        push(); // Push the current transformation matrix onto the stack
        translate(this.x, this.y, this.z);

        translate(-this.size, -this.size, -this.size);

        if (this.face == 0 || this.face == 5) rotateX(HALF_PI);
        else if (this.face == 1 || this.face == 3) rotateY(HALF_PI);
        fill(this.color);
        plane(this.size, this.size);
        pop(); // Pop the transformation matrix from the stack
    }

    move(face, pos) {
        this.face = face;
        this.pos = pos;
        this.orient();
    }
}
