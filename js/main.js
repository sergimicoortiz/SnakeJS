'use strict';

const c = document.getElementById('game');
const s = new snake(10, c, 10);
const game_tick = 20;
s.draw();
s.apple.draw();

document.addEventListener('keydown', e => {
    s.SetDirection(e.key);
});//keydown

const game_interval = setInterval(() => {
    if (s.game_over) {
        clearInterval(game_interval);
    }
    s.move();
    s.AppleColision();
}, game_tick);