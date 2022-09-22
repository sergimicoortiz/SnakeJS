class snake_slave {
    constructor(size, canvas) {
        this.canvas = canvas;
        this.size = size
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

    follow(x, y, d) {
        if (this.x !== 0 && this.y !== 0) { this.clear(); }
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
    }//follow

}//class