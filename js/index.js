'use strict';


//Get the user data form the server and put in the html
async function get_user_data() {
    if (!localStorage.getItem('token')) {
        document.getElementById('user_info').hidden = true;
    } else {
        const URL = `${URL_BASE}/user/token/${localStorage.getItem('token')}`;
        const response = await fetch(URL);
        if (response.status === 200) {
            const response_data = await response.json();
            document.getElementById('user_email').innerHTML = response_data.email;
            document.getElementById('login_btn').classList.value = 'h';
            localStorage.setItem('HightScore', response_data.HightScore);
        } else {
            console.error('ERROR REGISTER');
        }
    }//else if
}//get_user_data

//This function request the score board data and put it in a list.
async function get_score_board() {
    const board = document.getElementById('score_board');
    const URL = `${URL_BASE}/score`;
    const response = await fetch(URL);
    if (response.status === 200) {
        const response_data = await response.json();
        let string_players = "";
        response_data.forEach((player, i) => {
            string_players += `<li>Player N${i + 1}º:<ul><li>User: ${player.email}</li><li>Score: ${player.score}</li></ul></li>`
        });
        board.innerHTML = string_players;
    } else {
        console.error('ERROR REGISTER');
    }
}//get_score_board

//Logout function that remove the items in the local storage
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('HightScore');
    window.location.reload();
}//logout

get_user_data();
get_score_board();