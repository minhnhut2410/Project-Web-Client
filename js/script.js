const heroTitle = document.querySelector('.hero-content h1');
const textTitle = [
    "Discover our Products",
    "Best Quality Sport Gear",
    "Upgrade Your Game Today",
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