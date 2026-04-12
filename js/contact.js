const cartSection = document.querySelector(".cart-container");
const cartBadge = document.getElementById("cart-badge");

function updateCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0
    cart.forEach(item => {
        total += item.quantity;
    })
    if (total > 0) {
        cartBadge.style.display = "block";
        cartBadge.innerText = total;
    }
}
updateCart();
const form = document.getElementById("form-submit");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;
    const name = document.getElementById("full-name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const nameError = document.getElementById("full-name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    nameError.innerText = "";
    emailError.innerText = "";
    messageError.innerText = "";
    name.classList.remove("is-invalid");
    email.classList.remove("is-invalid");
    message.classList.remove("is-invalid");
    if (name.value.trim() === "") {
        nameError.innerText = "Please enter your name";
        name.classList.add("is-invalid");
        isValid = false;
    }


    if (email.value.trim() === "") {
        emailError.innerText = "Please enter your email";
        email.classList.add("is-invalid");
        isValid = false;
    } else if (!email.value.includes("@")) {
        emailError.innerText = "Invalid email";
        email.classList.add("is-invalid");
        isValid = false;
    }
    if (message.value.trim() === "") {
        messageError.innerText = "Please enter a message";
        message.classList.add("is-invalid");
        isValid = false;
    }
    if (isValid) {
        showToast("Send successfully")
        form.reset();
    }
})
function showToast(text) {
    const toastContainer = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.innerText = text;
    toast.classList.add("toast-message");
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function handleInput(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    input.addEventListener("input", function () {
        if (input.value.trim() !== "") {
            error.innerText = "";
            input.classList.remove("is-i    nvalid");
        }
    });
}

handleInput("full-name", "full-name-error");
handleInput("email", "email-error");
handleInput("message", "message-error");

