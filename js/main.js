'use strict';

const c = document.getElementById('game');
const s = new snake(10, c);
const game_tick = 200;
const fruits = new fruit_group(20, 5, c);
fruits.draw();
s.draw();

document.addEventListener('keydown', e => {
    s.SetDirection(e.key);
});//keydown

const game_interval = setInterval(() => {
    if (s.game_over) {
        clearInterval(game_interval);
    }
    s.move();
}, game_tick);