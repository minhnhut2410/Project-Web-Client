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
//handle section display
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const total = cart.length
// div
//     h1
//     div
//         div
//             div
//         div
if (total > 0) {
    cartSection.classList.add("has-items");
    cartSection.classList.remove("empty");

    const title = document.createElement("h1");
    title.classList.add("cart-title");
    title.textContent = "Shopping Cart";
    cartSection.appendChild(title);

    const grid = document.createElement("div");
    grid.classList.add("grid-product");


    const listProduct = document.createElement("div");
    listProduct.classList.add("list-product");


    const orderSummary = document.createElement("div");
    orderSummary.classList.add("order-summary");

    const orderSummaryTitle = document.createElement("h2");
    orderSummaryTitle.textContent = "Order Summary";

    //subTotal
    const subTotalWrapper = document.createElement("div");
    subTotalWrapper.classList.add("summary-item");
    const subTotal = document.createElement("span");
    subTotal.classList.add("sub-total");
    subTotal.innerText = "Subtotal";
    const subTotalValue = document.createElement("span");
    let temp = 0;
    cart.forEach(item => {
        temp += (parseFloat(item.price.replace(/[^0-9.]/g, "")) * parseInt(item.quantity));
    })
    subTotalValue.innerText = "$" + temp.toFixed(2);
    subTotalValue.classList.add("sub-total-value");
    subTotalWrapper.appendChild(subTotal);
    subTotalWrapper.appendChild(subTotalValue);

    //shipping price
    const shippingWrapper = document.createElement("div");
    shippingWrapper.classList.add("summary-item");
    const shipping = document.createElement("span");
    shipping.classList.add("shipping");
    shipping.innerText = "Shipping";
    const shippingPrice = document.createElement("span");
    shippingPrice.classList.add("shipping-price");
    shippingPrice.innerText = "$10.00";
    shippingWrapper.appendChild(shipping);
    shippingWrapper.appendChild(shippingPrice);
    //Tax Price (15%)
    const taxWrapper = document.createElement("div");
    taxWrapper.classList.add("summary-item");
    const tax = document.createElement("span");
    tax.classList.add("tax");
    tax.innerText = "Tax(15%)";
    const taxPrice = document.createElement("span");
    taxPrice.classList.add("tax-price");
    taxPrice.innerText = "$" + (parseFloat(subTotalValue.innerText.replace(/[^0-9.]/g, "")) * 0.15).toFixed(2)
    taxWrapper.appendChild(tax);
    taxWrapper.appendChild(taxPrice);

    //Total
    const afterTaxWrapper = document.createElement("div");
    afterTaxWrapper.classList.add("summary-item", "total");
    const afterTax = document.createElement("span");
    afterTax.classList.add("after-tax");
    afterTax.innerText = "Total";
    const afterTaxPrice = document.createElement("span");
    afterTaxPrice.classList.add("after-tax-price");
    afterTaxPrice.innerText = "$" + (parseFloat(subTotalValue.innerText.replace(/[^0-9.]/g, "")) + parseFloat(shippingPrice.innerText.replace(/[^0-9.]/g, "")) + parseFloat(taxPrice.innerText.replace(/[^0-9.]/g, ""))).toFixed(2);
    afterTaxWrapper.appendChild(afterTax);
    afterTaxWrapper.appendChild(afterTaxPrice);

    //Proceed to check out 
    const proceedButton = document.createElement("button");
    proceedButton.classList.add("btn-proceed");
    proceedButton.innerText = "Proceed to Checkout";
    //click
    proceedButton.addEventListener("click", function() {
        window.location.href = "/checkout.html"
    })
    orderSummary.appendChild(orderSummaryTitle);
    orderSummary.appendChild(subTotalWrapper);
    orderSummary.appendChild(shippingWrapper);
    orderSummary.appendChild(taxWrapper);
    orderSummary.appendChild(afterTaxWrapper);
    orderSummary.appendChild(proceedButton);

    cart.forEach(item => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const productImageContainer = document.createElement("div");
        productImageContainer.classList.add("product-image-container");

        const productImg = document.createElement("img");
        productImg.src = item.image;
        productImageContainer.appendChild(productImg);

        const productInfo = document.createElement("div");
        productInfo.classList.add("product-info-container");

        const productCategory = document.createElement("div");
        productCategory.classList.add("product-category", "fs-5");
        productCategory.textContent = item.category;

        const productTitle = document.createElement("h2");
        productTitle.textContent = item.name;

        const productPrice = document.createElement("h3");
        productPrice.classList.add("fs-4", "mt-2");
        productPrice.textContent = item.price;

        //add total-section
        const quantityContainer = document.createElement("div");
        quantityContainer.classList.add("quantity-container");

        const buttonMinus = document.createElement("button");

        const buttonPlus = document.createElement("button");

        const quantity = document.createElement("span");
        quantity.classList.add("quantity");
        buttonMinus.classList.add("btn-minus");
        buttonPlus.classList.add("btn-plus");
        buttonMinus.textContent = "-";
        buttonPlus.textContent = "+";
        quantity.textContent = item.quantity;

        const totalPrice = document.createElement("p");
        totalPrice.innerText = "$" + (parseInt(quantity.textContent) * parseFloat(item.price.replace(/[^0-9.]/g, ""))).toFixed(2) + " CAD";

        const trashIcon = document.createElement("div");
        trashIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`
        trashIcon.classList.add("trash-icon");
        totalPrice.classList.add("total-price");

        //handle funciton trash icon(Delete)
        trashIcon.addEventListener("click", function () {
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].name === item.name) {
                    cart.splice(i, 1);
                    break;
                }
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        })
        quantityContainer.appendChild(buttonMinus)
        quantityContainer.appendChild(quantity)
        quantityContainer.appendChild(buttonPlus)

        const quantityControl = document.createElement("div");
        quantityControl.classList.add("quantity-control-wrapper");
        quantityControl.appendChild(trashIcon);
        quantityControl.appendChild(quantityContainer)
        quantityControl.appendChild(totalPrice)

        productInfo.appendChild(productTitle);
        productInfo.appendChild(productCategory);
        productInfo.appendChild(productPrice);
        productCard.appendChild(productImageContainer);
        productCard.appendChild(productInfo);
        productCard.appendChild(quantityControl);

        listProduct.appendChild(productCard);
        buttonMinus.addEventListener('click', function () {
            if (parseInt(quantity.textContent) > 1) {
                quantity.textContent = parseInt(quantity.textContent) - 1;
                item.quantity = parseInt(quantity.textContent);
                localStorage.setItem("cart", JSON.stringify(cart));
            }

            const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
            const total = (parseInt(quantity.textContent) * price).toFixed(2)
            totalPrice.innerText = "$" + total + " CAD";
            updateCart()

        })
        buttonPlus.addEventListener('click', function () {
            quantity.textContent = parseInt(quantity.textContent) + 1;
            const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
            item.quantity = parseInt(quantity.textContent);
            localStorage.setItem("cart", JSON.stringify(cart));
            const total = (parseInt(quantity.textContent) * price).toFixed(2)
            totalPrice.innerText = "$" + total + " CAD";
            updateCart()
        })

        // <div class="product-card">
        // <div class="product-image-container mb-4 ">
        //     <img id="product-image" src=""></img>
        // </div>
        // <div class="product-info-container mb-4 me-4    ">
        //     <div class="product-category" id="product-category"></div>
        //     <h1 id="product-title" class="mb-3">

        //     </h1>
        //     <h2 id="product-price" class="fs-4">

    });
    grid.appendChild(listProduct);
    grid.appendChild(orderSummary);
    cartSection.appendChild(grid);

} else {
    cartSection.classList.add("empty");
    cartSection.classList.remove("has-items");
    cartSection.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.classList.add("svg-cart");

    wrapper.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
    `;

    cartSection.appendChild(wrapper);

    const h2 = document.createElement("h2");
    h2.textContent = "Your cart is empty";
    h2.classList.add("cart-title")
    cartSection.appendChild(h2)
    const p = document.createElement("p");
    p.classList.add("cart-content");
    p.textContent = "Add some products to get started!";
    cartSection.appendChild(p);
    const a = document.createElement("a");
    a.href = "/product.html"
    a.classList.add("btn-view-all");
    a.innerHTML = `Show Now <svg xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-arrow-right-icon lucide-arrow-right">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>`
    cartSection.appendChild(a);
}