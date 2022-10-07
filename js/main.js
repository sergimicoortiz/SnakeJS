'use strict';

let game_tick = 0;
let size = 10;
const main = document.getElementById('main');
const game_over_element = document.getElementById('game_over');
const score_element = document.getElementById('score');
let score = 0;


async function GameEnd() {
    console.log('GAME OVER');
    if (localStorage.getItem('HightScore') < score || localStorage.getItem('HightScore') == null) {
        localStorage.setItem('HightScore', score);
    }
    main.innerHTML = null;
    score_element.innerHTML = null;
    const game_over_html = `<h1>GAME OVER</h1><p>Score: ${score}</p><p>Hight score: ${localStorage.getItem('HightScore')}</p><br><button onclick="GameStart()">Restart</button>`;
    game_over_element.innerHTML = game_over_html;

    if (localStorage.getItem('token')) {
        const URL = `http://localhost:3000/user/${localStorage.getItem('token')}`;
        const body = JSON.stringify({ HightScore: localStorage.getItem('HightScore') });
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: body
        };
        const response = await fetch(URL, options);
        if (response.status !== 200) {
            console.error('ERROR UPDATE USER');
        }
    }//update user

}//GameEnd

function GameStart() {
    let obstacle = false;
    //The difficulty is set using local storage
    switch (localStorage.getItem('difficulty')) {
        case "1":
            game_tick = 130;
            size = 10;
            obstacle = false;
            break;
        case "2":
            game_tick = 90;
            size = 15;
            obstacle = true;
            break;
        /* case "3":
            game_tick = 40;
            size = 10;
            break; */
        default:
            game_tick = 130;
            size = 10;
            obstacle = false;
            break;
    }//switch difficulty

    //Create the canvas and clear all the other elements and generates the snake
    game_over_element.innerHTML = null;
    const c = document.createElement('canvas');
    document.getElementById('start').innerHTML = null;
    main.append(c);
    const s = new snake(c, size, obstacle);

    //Draw the snake for the first time, the same for the apple
    s.draw();
    

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
            score = s.score;
            GameEnd();
            clearInterval(game_interval);
        }
    }, game_tick);
}//GameStart