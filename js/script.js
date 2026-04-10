const heroTitle = document.querySelector('.hero-content h1');
const textTitle = [
    "Discover our Products",
    "Best Quality Sport Gear",
    "Upgrade Your Game Today",
];

let index = 0;

function showToastProduct(productName) {
    const toastContainer = document.getElementById("toast-container");
    const toast = document.createElement('div');
    toast.className = "toast-message";
    toast.innerHTML = `✅ Added "${productName}" to cart!`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 4000)
}
setInterval(function () {
    heroTitle.classList.add('fade-out');

    setTimeout(function () {
        index++;
        if (index >= textTitle.length) {
            index = 0;
        }
        heroTitle.textContent = textTitle[index];
        heroTitle.classList.remove('fade-out');
        const heroDots = document.querySelectorAll('.dot');
        heroDots.forEach(dot => dot.classList.remove('active'));
        heroDots[index].classList.add('active');
    }, 500)
}, 3000);
const heroDots = document.querySelectorAll('.dot');

heroDots.forEach((dot, i) => {
    dot.addEventListener('click', function () {

        index = i;

        heroTitle.classList.add('fade-out');

        setTimeout(() => {
            heroTitle.textContent = textTitle[index];
            heroTitle.classList.remove('fade-out');

            heroDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');

        }, 500);
    });
});
// hero-dot-active
const productGrid = document.getElementById('productGrid');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
nextBtn.addEventListener('click', function () {
    const card = productGrid.querySelector('.product-card');
    productGrid.scrollLeft += card.offsetWidth + 20;
})
prevBtn.addEventListener('click', function () {
    const card = productGrid.querySelector('.product-card');
    productGrid.scrollLeft -= card.offsetWidth + 20;
})

//handle toast after paying
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
window.addEventListener("load", function () {
    if (localStorage.getItem("showToast") === "true") {
        showToast("Order Succesfully")
        localStorage.removeItem("showToast");
    }
    if (localStorage.getItem("loginSuccessful") === "true") {
        showToast("Login Successfully")
        localStorage.removeItem("loginSuccessful")
    }
    //handle after login
})
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
const productCards = document.querySelectorAll(".product-card")
productCards.forEach(product => {
    const buttonAddCart = product.querySelector(".btn-add-cart");
    buttonAddCart.addEventListener('click', () => {
        const productName = product.querySelector(".product-info").textContent;
        const obj = {
            name: productName,
            category: product.querySelector(".category").textContent,
            price: product.querySelector(".price").textContent,
            image: product.querySelector(".product-image").src,
            quantity: 1
        }
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find(item => item.name === obj.name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(obj);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
        console.log(productName)
        showToastProduct(productName);
    })
})

//Shop by categories
const buttonCategories = document.querySelectorAll(".btn-category");
if (buttonCategories) {
    buttonCategories.forEach(btn => {
        btn.addEventListener("click", function (e) {
            const filterValue = btn.getAttribute("data-filter");
            localStorage.setItem("filter", filterValue)
        })
    })
}

//after login