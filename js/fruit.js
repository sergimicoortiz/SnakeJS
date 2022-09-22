class fruit {
    constructor(size, canvas) {
        this.size = size
        this.canvas = canvas;
        this.x = 0;
        this.y = 0;
    }//constructor

    draw() {
        if (this.x !== 0 && this.y !== 0) { this.clear(); }
        this.SetXY();
        this.figure = this.canvas.getContext('2d');
        this.figure.fillStyle = 'red';
        this.figure.fillRect(this.x, this.y, this.size, this.size);
    }//darw

    clear() {
        this.figure.clearRect(this.x, this.y, this.size, this.size);
    }//clear

    randomNumber(max) {
        const min = 0;
        return Math.floor(Math.random() * (max - min) + min);
    }//randomNumber

    SetXY() {

        this.x = this.randomNumber(this.canvas.width);
        this.y = this.randomNumber(this.canvas.height);

        if (this.y + this.size >= this.canvas.height) {
            this.y = this.canvas.height - this.size;
        }//end if

        if (this.x + this.size >= this.canvas.width) {
            this.x = this.canvas.width - this.size;
        }//end if

        if (this.x - this.size <= 0) {
            this.x = this.size;
        }//end if

        if (this.y - this.size <= 0) {
            this.y = this.size;
        }//end if
    }//SetXY

}//class