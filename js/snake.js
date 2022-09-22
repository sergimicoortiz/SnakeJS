class snake {
    constructor(size, canvas, fruit_size) {
        this.size = size
        this.x = 10;
        this.y = 10;
        this.direction = "s";
        this.canvas = canvas
        this.game_over = false;
        this.score = 0;
        this.apple = new fruit(fruit_size, canvas);
    }//cosntructor

    draw() {
        this.figure = this.canvas.getContext('2d');
        this.figure.fillStyle = 'green';
        this.figure.fillRect(this.x, this.y, this.size, this.size);
    }//darw

    clear() {
        this.figure.clearRect(this.x, this.y, this.size, this.size);
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
        if (this.y <= 0 || this.x <= 0 || this.y + this.size >= this.canvas.height || this.x + this.size >= this.canvas.width) {
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

    AppleColision() {

        if (this.x < this.apple.x + this.apple.size &&
            this.x + this.size > this.apple.x &&
            this.y < this.apple.y + this.apple.size &&
            this.size + this.y > this.apple.y) {
            this.apple.draw();
            this.score++;
            console.log('Score: ' + this.score);
        }//end if


    }//AppleColision


}//class