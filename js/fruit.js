class fruit {
    constructor(size, canvas) {
        this.size = size
        this.canvas = canvas;
        this.x = 0;
        this.y = 0;
    }//constructor

    //Draw the fruit in the canvas in the coordinates that are specified
    draw(coordinates) {
        if (this.x !== 0 && this.y !== 0) { this.clear(); } // Calls clear only when the x and y values are not default. 
        this.SetXY(coordinates);
        this.figure = this.canvas.getContext('2d');
        this.figure.fillStyle = 'red';
        this.figure.fillRect(this.x, this.y, this.size, this.size);
    }//draw

    //Deletes the fruit
    clear() {
        this.figure.clearRect(this.x, this.y, this.size, this.size);
    }//clear

    //Generate a random number
    randomNumber(max) {
        const min = 0;
        return Math.floor(Math.random() * (max - min) + min);
    }//randomNumber


    //Set the coordinates for the fruit
    SetXY(coordinates) {

        do {
            this.x = this.randomNumber(this.canvas.width);
            this.y = this.randomNumber(this.canvas.height);
            //First get a random number using the canvas width and height as the max value.
            //Later check if the fruit is inside or to close to the walls of the canvas and change the value if necessary
            if (this.y + this.size >= this.canvas.height) {
                this.y = this.canvas.height - (this.size * 2);
            }//end if

            if (this.x + this.size >= this.canvas.width) {
                this.x = this.canvas.width - (this.size * 2);
            }//end if

            if (this.x - this.size <= 0) {
                this.x = (this.size * 2);
            }//end if

            if (this.y - this.size <= 0) {
                this.y = (this.size * 2);
            }//end if
        } while (this.CollisionSpawn(coordinates)); //If the fruit collision with some part of the snake recalculates x and y

    }//SetXY

    //Check if the fruit collision with some part of the snake.
    CollisionSpawn(coordinates) {
        let collision = false;
        if (coordinates) {
            const s_size = coordinates[0]
            coordinates[1].forEach(e => {
                if (this.x < e.x + s_size &&
                    this.x + this.size > e.x &&
                    this.y < e.y + s_size &&
                    this.size + this.y > e.y) {
                    collision = true;
                }
            });//foreach
        }//end if
        return collision;
    }//CollisionSpawn

}//class