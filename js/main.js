'use strict';

//Variables for the game. The size is changed depending on the difficulty 
let game_tick = 0;
let size = 0;
let score = 0;
let colors = {
    main: 'green',
    apple: 'red',
    obstacle: 'pink'
};

//Document elements
const main = document.getElementById('main');
const game_over_element = document.getElementById('game_over');
const score_element = document.getElementById('score');
const form = document.getElementById('form');
const controller = document.getElementById('controller');
const controller_up = document.getElementById('controller_up');
const controller_down = document.getElementById('controller_down');
const controller_right = document.getElementById('controller_right');
const controller_left = document.getElementById('controller_left');

//Function when we die.
async function GameEnd() {
    form.classList.remove('h'); //Make the difficulty selector visible.
    controller.classList.value = 'h';
    //Set the HightScore in local storage to a new one.
    if (localStorage.getItem('HightScore') < score || localStorage.getItem('HightScore') == null) {
        localStorage.setItem('HightScore', score);
    }//if local

    //Delete the game elements and set the game over screen.
    main.innerHTML = null;
    score_element.innerHTML = null;
    const game_over_html = `<h1>GAME OVER</h1><p>Score: ${score}</p><p>Hight score: ${localStorage.getItem('HightScore')}</p><br><button onclick="GameStart()">Restart</button>`;
    game_over_element.innerHTML = game_over_html;

    // If there is a token in local storage then change the HightScore in the server
    if (localStorage.getItem('token')) {
        const URL = `${URL_BASE}/user/${localStorage.getItem('token')}`;
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
    form.className = 'h';
    controller.classList.remove('h');
    const form_data = Object.fromEntries(new FormData(form));
    let difficulty = 1;
    try {
        difficulty = parseInt(form_data.difficulty);
    } catch (error) {
        difficulty = 1;
    }
    //The difficulty is set using local storage
    switch (difficulty) {
        case 1:
            game_tick = 130;
            size = 10;
            break;
        case 2:
            game_tick = 90;
            size = 15;
            break;
        case 3:
            game_tick = 110;
            size = 15;
            colors.main = colors.apple = colors.obstacle = 'pink';
            break;
        default:
            game_tick = 130;
            size = 10;
            break;
    }//switch difficulty

    //Create the canvas and clear all the other elements and generates the snake
    game_over_element.innerHTML = null;
    const c = document.createElement('canvas');
    document.getElementById('start').innerHTML = null;
    main.append(c);
    const s = new snake(c, size, difficulty, colors);

    //Draw the snake for the first time, the same for the apple
    s.draw();

    //Detects the keydown event and pass the key to the snake SetDirection function
    document.addEventListener('keydown', e => {
        e.preventDefault();
        s.SetDirection(e.key);
    });//keydown

    //Event listeners for when the controller is clicked 
    controller_up.addEventListener('click', e => {
        e.preventDefault();
        s.SetDirection('ArrowUp');
    });
    controller_down.addEventListener('click', e => {
        e.preventDefault();
        s.SetDirection('ArrowDown');
    });
    controller_right.addEventListener('click', e => {
        e.preventDefault();
        s.SetDirection('ArrowRight');
    });
    controller_left.addEventListener('click', e => {
        e.preventDefault();
        s.SetDirection('ArrowLeft');
    });

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