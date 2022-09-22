'use strict';

const game_tick = 100;
const canvas_grid_size = 10;
const snake_size = 10;
const fruit_size = 10;
const c = document.getElementById('game');
const s = new snake(c, snake_size, fruit_size, canvas_grid_size);

s.draw();
s.apple.draw();

document.addEventListener('keydown', e => {
    s.SetDirection(e.key);
});//keydown

const game_interval = setInterval(() => {
    if (s.game_over) {
        clearInterval(game_interval);
        window.location.reload();
    }
    s.move();
}, game_tick);

//The snake is painted when is suposed to not be painted when the snake is close to the walls.
//The fruit can spawn inside one of the snake_slave