'use strict';

const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const loginText = document.querySelector(".title-text .login");
const form_login = document.getElementById('form_login');
const form_register = document.getElementById('form_register');
const register_email_error = document.getElementById('register_email_error');
const register_password_error = document.getElementById('register_password_error');
const login_email_error = document.getElementById('login_email_error');
const login_password_error = document.getElementById('login_password_error');


signupBtn.onclick = () => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
};

loginBtn.onclick = () => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
};

form_login.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    regex_login(data);
});//login

form_register.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    //regex_register(data); 
    add_user(data); //REMOVE ONLY FOR TESTING
});//login

function regex_register(data) {
    register_email_error.innerHTML = '';
    register_password_error.innerHTML = '';
    const password1 = data.pass1;
    const password2 = data.pass2;
    const email = data.email;
    const email_regex = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    let error = false;

    if (email.length === 0) {
        register_email_error.innerHTML = '*You have to introduce an email';
        error = true;
    } else if (email_regex.test(email) === false) {
        register_email_error.innerHTML = "*The email's format is incorrect";
        error = true;
    };//end else if

    if (password1 !== password2) {
        register_password_error.innerHTML = '*The passwords must be the same';
        error = true;
    }//end if

    if (password1.length < 8) {
        register_password_error.innerHTML = '*The password need a minimum of 8 characters';
        error = true;
    }//end if

    if (error === false) {
        register_validate_saerver(data);
    }//end if
}//end validate_regex_register

function regex_login(data) {
    login_email_error.innerHTML = '';
    login_password_error.innerHTML = '';
    const password = data.pass;
    const email = data.email;
    const email_regex = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    let error = false;

    //COMENT ONLY FOR TESTING

    /* if (email.length === 0) {
        login_email_error.innerHTML = '*You have to introduce an email';
        error = true;
    } else if (email_regex.test(email) === false) {
        login_email_error.innerHTML = "*The email's format is incorrect";
        error = true;
    };//end else if */

    if (password.length < 1) {
        login_password_error.innerHTML = "*The password con't be empty";
        error = true;
    }//end if

    if (error === false) {
        login_validate_server(data);
    }//end if
}//regex_login

async function register_validate_server(data) {
    const URL = `http://localhost:3000/user/${data.email}`;
    const response = await fetch(URL);
    if (response.status === 404) {
        add_user(data);
    } else {
        register_email_error.innerHTML = "*The email already in use";
    }
}//register_validate_saerver

async function login_validate_server(data) {
    const URL = `http://localhost:3000/user/${data.email}/${data.pass}`;
    const response = await fetch(URL);
    if (response.status === 200) {
        const response_data = await response.json();
        if (response_data.status !== 'OK') {
            login_password_error.innerHTML = "*The password or the email are incorect";
        } else {
            localStorage.setItem('token', response_data.id);
            window.location.href = '../index.html';
        }
    } else {
        console.error('ERROR LOGIN PASS');
    }
}//login_validate_server

async function add_user(data) {
    const user = {
        email: data.email,
        password: data.pass1
    }
    const URL = 'http://localhost:3000/user';
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    const response = await fetch(URL, options);
    if (response.status === 200) {
        const response_data = await response.json();
        localStorage.setItem('token', response_data.id);
        window.location.href = '../index.html';
    } else {
        console.error('ERROR REGISTER');
    }
}//add_user