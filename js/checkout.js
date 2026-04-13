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

const select = document.getElementById("payment-method");
const creditCardForm = document.getElementById("credit-card-form");
const paypalForm = document.getElementById("paypal-form");

select.addEventListener("change", function () {
    const value = select.value;
    creditCardForm.style.display = "none";
    paypalForm.style.display = "none";

    if (value === "credit-card") {
        creditCardForm.style.display = "block";
    } else if (value === "paypal") {
        paypalForm.style.display = "block"
    }
})
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let subtotalPrice = 0;

//handle summary order
const productList = document.getElementById("product-list");
if (productList) {
    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("d-flex", "justify-content-between")
        const nameProduct = document.createElement("span");
        const price = document.createElement("span");
        nameProduct.textContent = item.name + " x " + item.quantity;
        price.textContent = "$" + (
            parseInt(item.quantity) * parseFloat(item.price.replace(/[^0-9.]/g, ""))
        ).toFixed(2);
        div.appendChild(nameProduct);
        div.appendChild(price);
        productList.appendChild(div)
        subtotalPrice += (parseInt(item.quantity) * parseFloat(item.price.replace(/[^0-9.]/g, "")))
    });
}
const subTotalValue = document.querySelector(".sub-total-value");
subTotalValue.textContent = "$" + subtotalPrice.toFixed(2);

const tax = subtotalPrice * 0.15;
const taxValue = document.querySelector(".tax-value");
taxValue.textContent = "$" + tax.toFixed(2);

const total = subtotalPrice + 10 + tax;
const totalValue = document.querySelector(".total-value");
totalValue.textContent = "$" + total.toFixed(2);

//handle button place
const buttonOrder = document.getElementById("btn-place-order");

if (buttonOrder) {
    buttonOrder.addEventListener("click", function () {

        let isValid = true;

        const name = document.getElementById("full-name");
        const email = document.getElementById("email");
        const address = document.getElementById("address");
        const city = document.getElementById("city");
        const zip = document.getElementById("zip-code");
        const paymentMethod = document.getElementById("payment-method");

        const nameError = document.getElementById("full-name-error");
        const emailError = document.getElementById("email-error");
        const addressError = document.getElementById("address-error");
        const cityError = document.getElementById("city-error");
        const zipError = document.getElementById("zip-code-error");
        const paymentMethodError = document.getElementById("payment-method-error");

        nameError.innerText = "";
        emailError.innerText = "";
        addressError.innerText = "";
        cityError.innerText = "";
        zipError.innerText = "";

        name.classList.remove("is-invalid");
        email.classList.remove("is-invalid");
        address.classList.remove("is-invalid");
        city.classList.remove("is-invalid");
        zip.classList.remove("is-invalid");
        paymentMethod.classList.remove("is-invalid");

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


        if (address.value.trim() === "") {
            addressError.innerText = "Please enter address";
            address.classList.add("is-invalid");
            isValid = false;
        }


        if (city.value.trim() === "") {
            cityError.innerText = "Please enter city";
            city.classList.add("is-invalid");
            isValid = false;
        }


        if (zip.value.trim() === "") {
            zipError.innerText = "Please enter zip code";
            zip.classList.add("is-invalid");
            isValid = false;
        }
        if (select.value === "choose-method-payment") {
            paymentMethodError.innerText = "Please choose the method payment";
            paymentMethod.classList.add("is-invalid");
            isValid = false;
        }
        if (select.value === "credit-card") {
            const cardNumber = document.getElementById("card-number");
            const expiryDate = document.getElementById("expiry-date");
            const cvv = document.getElementById("cvv");
            const cardNumberError = document.getElementById("card-number-error");
            const expiryDateError = document.getElementById("expiry-date-error");
            const cvvError = document.getElementById("cvv-error");
            if (cardNumber.value.trim() === "") {
                cardNumberError.innerText = "Please enter your card number";
                cardNumber.classList.add("is-invalid");
                isValid = false;
            }
            if (expiryDate.value.trim() === "") {
                expiryDateError.innerText = "Please enter expiry date";
                expiryDate.classList.add("is-invalid");
                isValid = false;
            }
            if (cvv.value.trim() === "") {
                cvvError.innerText = "Please enter CVV";
                cvv.classList.add("is-invalid");
                isValid = false;
            }
        }
        if (select.value !== "credit-card") {
            document.getElementById("card-number").classList.remove("is-invalid");
            document.getElementById("expiry-date").classList.remove("is-invalid");
            document.getElementById("cvv").classList.remove("is-invalid");
        }


        if (isValid) {
            const cardNumber = document.getElementById("card-number").value.trim();
            console.log(cardNumber.replace(/\s/g, "").length);
            const orderName = document.getElementById("order-name");
            const orderEmail = document.getElementById("order-email");
            const orderAddress = document.getElementById("order-address");
            const orderPayment = document.getElementById("order-payment");
            const orderTotal = document.getElementById("order-total");
            orderName.textContent = document.getElementById("full-name").value;
            orderEmail.textContent = document.getElementById("email").value;
            orderAddress.textContent = document.getElementById("address").value;
            orderPayment.textContent = select.value
            orderTotal.textContent = "$" + total.toFixed(2);
            // setTimeout(() => {
            //     localStorage.removeItem("cart");
            //     window.location.href = "/product.html";
            // }, 3000);
            const modal = document.querySelector(".modal-overlay");
            modal.style.display = "flex"
            const buttonCancel = document.getElementById("btn-cancel");
            buttonCancel.addEventListener("click", function () {
                modal.style.display = "none"
            })
            const buttonX = document.getElementById("close-modal")
            buttonX.addEventListener("click", function () {
                modal.style.display = "none"
            })
            const buttonConfirm = document.getElementById("btn-confirm");
            buttonConfirm.addEventListener("click", function () {
                localStorage.setItem("showToast", "true");
                localStorage.removeItem("cart");
                window.location.href = "index.html"
            })

        }
    })
}

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

handleInput("full-name", "full-name-error");
handleInput("email", "email-error");
handleInput("address", "address-error");
handleInput("city", "city-error");
handleInput("zip-code", "zip-code-error");
handleInput("payment-method", "payment-method-error");
handleInput("card-number", "card-number-error");
handleInput("expiry-date", "expiry-date-error");
handleInput("cvv", "cvv-error");

function onlyNumber(input) {
    input.value = input.value.replace(/\D/g, "");
}
