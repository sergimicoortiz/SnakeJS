const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const loginText = document.querySelector(".title-text .login");
const form_login = document.getElementById('form_login');
const form_register = document.getElementById('form_register');


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
    console.log(data);
});//login

form_register.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    regex_register(data);
});//login

function regex_register(data) {
    const password1 = data.pass1;
    const password2 = data.pass2;
    const email = data.email;
    const email_regex = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    let error = false;

    if (email.length === 0) {
        //$('#register_errors_email').html('*You have to introduce an email');
        error = true;
    } else if (email_regex.test(email) === false) {
        $('#register_errors_email').html("*The email's format is incorrect");
        error = true;
    };//end else if

    if (password1.length < 8) {
        //$('#register_errors_password').html('*The password need a minimum of 8 characters');
        error = true;
    }//end if

    if (password1 !== password2) {
        //$('#register_errors_password').html('*The password need a minimum of 8 characters');
        error = true;
    }//end if

    if (error === false) {
        console.log('ok reg');
    }//end if
}//end validate_regex_register