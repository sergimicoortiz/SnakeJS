class fruit {
    constructor(size, canvas) {
        this.size = size
        this.canvas = canvas;
        this.x = 0;
        this.y = 0;
    }//constructor

    draw(coordinates) {
        if (this.x !== 0 && this.y !== 0) { this.clear(); }
        this.SetXY(coordinates);
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

    SetXY(coordinates) {

        do {
            this.x = this.randomNumber(this.canvas.width);
            this.y = this.randomNumber(this.canvas.height);

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
        } while (this.ColisionSpawn(coordinates));

    }//SetXY


    ColisionSpawn(coordinates) {
        let coolision = false;
        if (coordinates) {
            const s_size = coordinates[0]
            coordinates[1].forEach(e => {
                if (this.x < e.x + s_size &&
                    this.x + this.size > e.x &&
                    this.y < e.y + s_size &&
                    this.size + this.y > e.y) {
                    coolision = true;
                }
            });//foreach
        }//end if
        return coolision;
    }//ColisionSpawn

}//class