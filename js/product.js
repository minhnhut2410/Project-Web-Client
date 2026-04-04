const filterButtons = document.querySelectorAll("#filter-buttons button");
const products = document.querySelectorAll(".product-grid a");
const searchBtns = document.getElementById("search-bar");
let currentCategory = 'all';
const cartBadge = document.getElementById("cart-badge");

function filter() {
    const searchItem = searchBtns.value.toLowerCase().trim();
    products.forEach(product => {
        const title = product.querySelector(".product-info").textContent.toLowerCase().trim();
        const category = product.querySelector(".category").textContent.toLowerCase().trim();
        if (title.includes(searchItem) && (currentCategory === 'all' || category === currentCategory)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    })
}
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        })
        button.classList.add("active");
        currentCategory = button.getAttribute('data-filter').toLowerCase().trim();
        filter();
    })
})
searchBtns.addEventListener("input", filter)

//Add to Cart Button
//ADD Toast notification
const toastContainer = document.createElement("div");
toastContainer.id = "toast-container";
document.body.appendChild(toastContainer);

function showToast(productName) {
    const toast = document.createElement('div');
    toast.className = "toast-message";
    toast.innerHTML = `✅ Added "${productName}" to cart!`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 4000)
}

const productCards = document.querySelectorAll(".product-card")
productCards.forEach(product => {
    const buttonAddCart = product.querySelector(".btn-add-cart");
    buttonAddCart.addEventListener('click', () => {
        const productName = product.querySelector(".product-info").textContent
        const obj = {
            name: productName,
            category: product.querySelector(".category").textContent,
            price: product.querySelector(".price").textContent,
            image: product.querySelector(".product-image").src
        }
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(obj)
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
        showToast(productName);
    })
})
//Handle the total of products when add to cart
function updateCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.length;
    if (total > 0) {
        cartBadge.style.display = "block";
        cartBadge.innerText = total;
    }
}
updateCart();