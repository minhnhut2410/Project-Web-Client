const heroTitle = document.querySelector('.hero-content h1');
const textTitle = [
    "Discover our Products",
    "Best Quality Sport Gear",
    "Upgrade Your Game Today",
    "Special Offers Just For You"
];

let index = 0;

setInterval(function () {
    heroTitle.classList.add('fade-out');

    setTimeout(function () {
        index++;
        if (index >= textTitle.length) {
            index = 0;
        }
        heroTitle.textContent = textTitle[index];
        heroTitle.classList.remove('fade-out');

    }, 500)
}, 3000);
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