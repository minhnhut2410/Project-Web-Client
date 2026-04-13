//Handle login
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input")

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

handleInput("email-input", "email-error");
handleInput("password-input", "password-error");
if (loginForm) {

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let isValid = true;
        const email = emailInput.value.trim();
        const emailError = document.getElementById("email-error");
        const password = passwordInput.value.trim();
        const passwordError = document.getElementById("password-error");
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
        if (isValid) {
            const user = {
                email: email,
                password: password
            }
            let listUser = JSON.parse(localStorage.getItem("listUser")) || [];
            const foundUser = listUser.find(u => u.email === user.email && u.password === user.password)
            if (foundUser) {
                localStorage.setItem("loginSuccessful", "true");
                localStorage.setItem("currentUser", JSON.stringify(foundUser))
                window.location.href = "index.html"
            } else {
                emailError.innerText = "Invalid email or password";
                emailInput.classList.add("is-invalid");
                passwordInput.classList.add("is-invalid");
            }

        }

    })
}