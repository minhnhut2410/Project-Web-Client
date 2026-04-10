//Handle register
const registerForm = document.getElementById("register-form");
const fullNameInput = document.getElementById("full-name-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const passwordConfirmInput = document.getElementById("password-confirm-input");
function handleInput(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    input.addEventListener("input", function () {
        if (input.value.trim() !== "") {
            error.innerText = "";
            input.classList.remove("is-invalid");
        }
    });
}

handleInput("full-name-input", "full-name-error");
handleInput("email-input", "email-error");
handleInput("password-input", "password-error");
handleInput("password-confirm-input", "password-confirm-error");



if (registerForm) {

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let isValid = true;
        const fullName = fullNameInput.value.trim();
        const fullNameError = document.getElementById("full-name-error");
        const email = emailInput.value.trim();
        const emailError = document.getElementById("email-error");
        const password = passwordInput.value.trim();
        const passwordError = document.getElementById("password-error");
        const passwordConfirm = passwordConfirmInput.value.trim();
        const passwordConfirmError = document.getElementById("password-confirm-error");
        if (fullName === "") {
            fullNameError.innerText = "Please enter your full name";
            fullNameInput.classList.add("is-invalid");
            isValid = false;
        }
        if (email === "") {
            emailError.innerText = "Please enter your email";
            emailInput.classList.add("is-invalid");
            isValid = false;
        }
        if (password === "") {
            passwordError.innerText = "Please enter your password";
            passwordInput.classList.add("is-invalid");
            isValid = false;
        }
        if (passwordConfirm === "") {
            passwordConfirmError.innerText = "Please confirm your password";
            passwordConfirmInput.classList.add("is-invalid");
            isValid = false;

        } else if (password != passwordConfirm) {
            passwordConfirmError.innerText = "Password does not match";
            passwordConfirmInput.classList.add("is-invalid");
            isValid = false;
        }

        if (isValid) {
            let listUser = JSON.parse(localStorage.getItem("listUser")) || [];
            const isExist = listUser.find(user => user.email === email);
            if (isExist) {
                emailError.innerText = "Email is already registered";
                emailInput.classList.add("is-invalid");
                return;
            }
            const user = {
                fullName: fullName,
                email: email,
                password: password
            }
            listUser.push(user)
            localStorage.setItem("listUser", JSON.stringify(listUser))
            window.location.href = "login.html";

        }

    })
}