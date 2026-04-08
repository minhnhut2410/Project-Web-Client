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
const errorMsg = document.getElementById("error-message");
const successMsg = document.getElementById("success-message");
if (buttonOrder) {
    buttonOrder.addEventListener("click", function () {
        const name = document.getElementById("full-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value.trim();
        const zip = document.getElementById("zip-code").value.trim();
        if (!name || !email || !address || !city || !zip) {
            errorMsg.innerText = "Please fill in all required fields";
            successMsg.classList.add("d-none");
            return;
        }
        if (!email.includes("@")) {
            errorMsg.innerText = "Invalid email";
            successMsg.classList.add("d-none");
            return;
        }
        errorMsg.innerText = "";

        successMsg.classList.remove("d-none");
        document.querySelector("form").reset();

    })
}