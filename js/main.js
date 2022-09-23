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
    document.getElementById('start').innerHTML = null;
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
            if (localStorage.getItem('HightScore') < s.score || localStorage.getItem('HightScore') == null) {
                localStorage.setItem('HightScore', s.score);
            }
            main.innerHTML = null;
            score_element.innerHTML = null;
            const game_over_html = `<h1>GAME OVER</h1><p>Score: ${s.score}</p><p>Hight score: ${localStorage.getItem('HightScore')}</p><br><button onclick="GameStart()">Restart</button>`;
            game_over_element.innerHTML = game_over_html;
            clearInterval(game_interval);
        }
    }, game_tick);
}//GameStart