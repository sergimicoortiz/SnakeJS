'use strict';

let game_tick = 0;
const canvas_grid_size = 10;
const snake_size = 10;
const fruit_size = 10;

function GameStart() {

    //The difficulty is set using local storage
    switch (localStorage.getItem('difficulty')) {
        case "1":
            game_tick = 130;
            break;
        case "2":
            game_tick = 90;
            break;
        case "3":
            game_tick = 40;
            break;
        default:
            game_tick = 100;
            break;
    }//switch difficulty

    //Create the canvas and clear all the other elements and generates the snake 
    const main = document.getElementById('main');
    const game_over_element = document.getElementById('game_over');
    game_over_element.innerHTML = null;
    const c = document.createElement('canvas');
    const score_element = document.getElementById('score');
    document.getElementById('start').innerHTML = null;
    main.append(c);
    const s = new snake(c, snake_size, fruit_size, canvas_grid_size);

    //Draw the snake for the first time, the same for the apple
    s.draw();
    s.apple.draw();

    //Detects the keydown event and pass the key to the snake SetDirection function
    document.addEventListener('keydown', e => {
        s.SetDirection(e.key);
    });//keydown

    //The interval that moves the game.
    //First the interval moves the snake and refresh the Score value.
    //Next detects if the game_over value is false.
    //If the value is false the interval stops and we generate the game over screen
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