class fruit {
    constructor(size, canvas) {
        this.canvas = canvas;
        this.width = size;
        this.height = size;
        this.x = this.randomNumber(this.canvas.width);
        this.y = this.randomNumber(this.canvas.height);
    }//constructor

    draw() {
        this.figure = this.canvas.getContext('2d');
        this.figure.fillStyle = 'red';
        this.figure.fillRect(this.x, this.y, this.width, this.height);
    }//darw

    randomNumber(max) {
        const min = 0;
        return Math.random() * (max - min) + min;
    }//randomNumber

    GetXY() {
        return [this.x, this.y];
    }//GetXY

}//class