'use strict';

class snake_slave {
    constructor(size, canvas) {
        this.canvas = canvas;
        this.direction = null;
        this.size = size
        this.spawn = true;
        this.x = 0;
        this.y = 0;
    }//constructor


    //Draw the this part of the snake
    draw() {
        this.figure = this.canvas.getContext('2d');
        this.figure.fillStyle = 'green';
        this.figure.fillRect(this.x, this.y, this.size, this.size);
    }//draw

    //Clear this part of the snake
    clear() {
        this.figure.clearRect(this.x, this.y, this.size, this.size);
    }//clear

    follow(parent) {
        this.direction = this.SetDirection(parent);
        const d = parent.direction;
        const x = parent.x;
        const y = parent.y;
        //Only clear if this is not the first time that the object has been draw
        if (!this.spawn) { this.clear(); }
        //Depending on the direction sets the x and y to a different point 
        switch (d) {
            case 'n':
                this.x = x;
                this.y = y + this.size;
                break;
            case 's':
                this.x = x;
                this.y = y - this.size;
                break;
            case 'e':
                this.x = x - this.size;
                this.y = y;
                break;
            case 'o':
                this.x = x + this.size;
                this.y = y;
                break;
        }//switch
        //Draw the snake and set the spawn to false
        this.draw();
        this.spawn = false;
    }//follow


    //Set the direction that this part of the snake must follow, the directions depends on the parent coordinates.
    SetDirection(parent) {
        if (this.x == 0 && this.y == 0) { return parent.direction }
        if (parent.x !== this.x && parent.y !== this.y) { return this.direction; }//if
        return parent.direction;
    }//SetDirection

}//class