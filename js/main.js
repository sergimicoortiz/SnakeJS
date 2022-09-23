'use strict';

const game_tick = 100;
const canvas_grid_size = 10;
const snake_size = 10;
const fruit_size = 10;


function GameStart() {
    const main = document.getElementById('main');
    const game_over_element = document.getElementById('game_over');
    game_over_element.innerHTML = null;
    const c = document.createElement('canvas');
    const score_element = document.getElementById('score');
    document.getElementById('start').innerHTML = '';
    main.append(c);
    const s = new snake(c, snake_size, fruit_size, canvas_grid_size);

    s.draw();
    s.apple.draw();

    document.addEventListener('keydown', e => {
        s.SetDirection(e.key);
    });//keydown

    const game_interval = setInterval(() => {
        s.move();
        score_element.innerHTML = `Score: ${s.score}`
        if (s.game_over) {
            main.innerHTML = null;
            score_element.innerHTML = null;
            game_over_element.innerHTML = '<h1>GAME OVER</h1><br><button onclick="GameStart()">Restart</button>';
            clearInterval(game_interval);
        }
    }, game_tick);
}//GameStart