class snake {
    constructor(size, canvas) {
        this.width = size;
        this.height = size;
        this.x = 0;
        this.y = 0;
        this.direction = "s";
        this.canvas = canvas
        this.game_over = false;
    }//cosntructor

    draw() {
        this.figure = this.canvas.getContext('2d');
        this.figure.fillStyle = 'green';
        this.figure.fillRect(this.x, this.y, this.width, this.height);
    }//darw

    clear() {
        this.figure.clearRect(this.x, this.y, this.width, this.height);
    }//clear

    move() {
        this.clear();
        switch (this.direction) {
            case 'n':
                this.y = this.y - 1;
                break;
            case 's':
                this.y = this.y + 1;
                break;
            case 'e':
                this.x = this.x + 1;
                break;
            case 'o':
                this.x = this.x - 1;
                break;
        }//swich
        if (this.y < 0 || this.x < 0) {
            console.log("Game Over");
            this.game_over = true;
        }//end
        this.draw();
    }//move

    SetDirection(code) {
        switch (code) {
            case 'ArrowRight':
                if (this.direction !== 'o') { this.direction = 'e'; }
                break;
            case 'ArrowDown':
                if (this.direction !== 'n') { this.direction = 's'; }
                break;
            case 'ArrowUp':
                if (this.direction !== 's') { this.direction = 'n'; }
                break;
            case 'ArrowLeft':
                if (this.direction !== 'e') { this.direction = 'o'; }
                break;
        }//swich
    }//SetDirection

    /* DetectFruit(data) {
        console.log(this.canvas);
    }//DetectFruit */
}//class