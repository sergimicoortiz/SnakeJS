'use strict';

async function get_user_data() {
    if (!localStorage.getItem('token')) {
        document.getElementById('user_info').hidden = true;
    } else {
        const URL = `http://localhost:3000/user/token/${localStorage.getItem('token')}`;
        const response = await fetch(URL);
        if (response.status === 200) {
            const response_data = await response.json();
            document.getElementById('user_email').innerHTML = response_data.email;
            localStorage.setItem('HightScore', response_data.HightScore);
        } else {
            console.error('ERROR REGISTER');
        }
    }//else if
}//get_user_data

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('HightScore');
    window.location.reload();
}//logout

get_user_data();