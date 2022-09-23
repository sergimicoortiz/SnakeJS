class snake_slave {
    constructor(size, canvas) {
        this.canvas = canvas;
        this.direction = null;
        this.size = size
        this.spawn = true;
        this.x = 0;
        this.y = 0;
    }//constructor

    draw() {
        this.figure = this.canvas.getContext('2d');
        this.figure.fillStyle = 'green';
        this.figure.fillRect(this.x, this.y, this.size, this.size);
    }//darw

    clear() {
        this.figure.clearRect(this.x, this.y, this.size, this.size);
    }//clear

    follow(parent) {
        this.direction = this.SetDirection(parent);
        const d = parent.direction;
        const x = parent.x;
        const y = parent.y;
        if (!this.spawn) { this.clear(); }
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
        }//swich
        this.draw();
        this.spawn = false;
    }//follow

    SetDirection(parent) {
        if (this.x == 0 && this.y == 0) { return parent.direction }
        if (parent.x !== this.x && parent.y !== this.y) { return this.direction; }//if
        return parent.direction;
    }//SetDirection

}//class