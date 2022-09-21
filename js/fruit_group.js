class fruit_group {
    constructor(num, size, canvas) {
        this.fruits = [];
        this.create_fruits(num, size, canvas);
    }

    create_fruits(num, size, canvas) {
        for (let i = 0; i < num; i++) {
            const new_fruit = new fruit(size, canvas)
            this.fruits.push(new_fruit);
        }//end for
    }//create_fruits


    draw() {
        this.fruits.forEach(f => {
            f.draw();
        })
    }//draw
}//class