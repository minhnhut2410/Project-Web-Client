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