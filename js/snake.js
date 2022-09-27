class snake {
    constructor(canvas, size, fruit_size, canvas_square) {
        this.size = size
        this.canvas_square = canvas_square;
        this.x = 10;
        this.y = 10;
        this.direction = "s";
        this.canvas = canvas
        this.game_over = false;
        this.score = 0;
        this.apple = new fruit(fruit_size, canvas);
        this.salves = [];
    }//constructor

    //Draws the snake
    draw() {
        this.figure = this.canvas.getContext('2d');
        this.figure.fillStyle = 'green';
        this.figure.fillRect(this.x, this.y, this.size, this.size);
    }//draw

    //Clears the snake
    clear() {
        this.figure.clearRect(this.x, this.y, this.size, this.size);
    }//clear

    move() {
        this.clear();
        //Set the snake coordinates taking in consideration the direction of the snake
        switch (this.direction) {
            case 'n':
                this.y = this.y - this.canvas_square;
                break;
            case 's':
                this.y = this.y + this.canvas_square;
                break;
            case 'e':
                this.x = this.x + this.canvas_square;
                break;
            case 'o':
                this.x = this.x - this.canvas_square;
                break;
        }//switch

        //Detects if the snake is inside or in contact with the walls and calls the GameOver function
        if (this.y + this.size - 3 >= this.canvas.height) {
            this.y = this.canvas.height - this.size;
            this.GameOver();
        }
        if (this.x + this.size - 3 >= this.canvas.width) {
            this.x = this.canvas.width - this.size;
            this.GameOver();
        }
        if (this.y <= -3) {
            this.y = 0
            this.GameOver();
        }
        if (this.x <= -3) {
            this.x = 0
            this.GameOver();
        }

        //Draw the snake, detects the collisions and move the other parts of the snake
        this.draw();
        this.AppleCollision();
        this.SlaveCollision();
        this.SlavesMove();

    }//move

    //Change the direction using the keydown event
    SetDirection(code) {
        switch (code) {
            case 'd':
            case 'ArrowRight':
                if (this.direction !== 'o') { this.direction = 'e'; }
                break;
            case 's':
            case 'ArrowDown':
                if (this.direction !== 'n') { this.direction = 's'; }
                break;
            case 'w':
            case 'ArrowUp':
                if (this.direction !== 's') { this.direction = 'n'; }
                break;
            case 'a':
            case 'ArrowLeft':
                if (this.direction !== 'e') { this.direction = 'o'; }
                break;
        }//switch
    }//SetDirection

    //Detects the collision with the apples, in case of collision add one point redraw the apple and add a slave to the slave array 
    AppleCollision() {

        if (this.x < this.apple.x + this.apple.size &&
            this.x + this.size > this.apple.x &&
            this.y < this.apple.y + this.apple.size &&
            this.size + this.y > this.apple.y) {

            this.apple.draw([this.size, this.GetAllCoordinates()]);
            this.score++;
            this.salves.push(new snake_slave(this.size, this.canvas));
        }//end if
    }//AppleCollision

    //Detects if the snakes collides with himself and if true call the GameOver function
    SlaveCollision() {
        this.salves.forEach(s => {
            if (this.x < s.x + s.size &&
                this.x + this.size > s.x &&
                this.y < s.y + s.size &&
                this.size + this.y > s.y) {
                this.GameOver();
            }//end if
        });//foreach
    }//SlaveCollision

    //Call the follow function in all the slaves in the array
    SlavesMove() {
        //The first follows the head of the snake(this object) and the others the previous slave
        for (let i = 0; i < this.salves.length; i++) {
            if (i === 0) {
                this.salves[i].follow(this);
            } else {
                this.salves[i].follow(this.salves[i - 1]);
            }//end else if
        }//end for
    };//

    //Change the game_over value to true
    GameOver() {
        this.game_over = true;
    }//IsGameOver

    //Get the coordinates fot the head and all the slaves. Is used in the fruit class
    GetAllCoordinates() {
        let coordinates = [];
        coordinates.push({ x: this.x, y: this.y });
        this.salves.forEach(s => {
            coordinates.push({ x: s.x, y: s.y });
        });//foreach
        return coordinates;
    }//GetAllCoordinates

}//class