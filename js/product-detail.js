const products = [{
        id: "1",
        name: "Yonex Astrox 100zz",
        category: "Badminton Racket",
        price: 329.99,
        image: "/images/ASTROX100ZZVAF-GRBE-4UG5-A.webp",
        description: "Designed for advanced players seeking aggressive, attacking gameplay with a solid feel and quick snapback."
    },
    {
        id: "2",
        name: "Yonex Men's Subaxia GT - Dark Grey",
        category: "Shoes",
        price: 239.95,
        image: "/images/SHBSG1MEX-144-A.webp",
        description: "Premium badminton shoes offering excellent stability, grip, and shock absorption for fast-paced footwork."
    },
    {
        id: "3",
        name: "Franklin Pro Series Paddle Bag - Black/White",
        category: "Badminton Racket",
        price: 179.99,
        image: "/images/52883-phase1-main2.webp",
        description: "Spacious and durable paddle bag designed to carry all your essentials to and from the court."
    },
    {
        id: "4",
        name: "Selkirk SLK Halo Pro - XL",
        category: "Pickleball",
        price: 239.95,
        image: "/images/8524_SLK-Halo-Pro-XL-RD-A.webp",
        description: "The SLK Halo Pro XL delivers optimal power and spin, making it a favorite for competitive pickleball players."
    },
    {
        id: "5",
        name: "Babolat Evo Aero Lite Pink Gen 2",
        category: "Pickleball",
        price: 199.95,
        image: "/images/101565-100-A.webp",
        description: "A lightweight and maneuverable paddle that provides effortless power and comfort."
    },
    {
        id: "6",
        name: "Racket Yasaka Mark V Carbon",
        category: "Pickleball",
        price: 179.95,
        image: "/images/yasaka-mark-v-carbon.webp",
        description: "High-quality carbon construction ensuring max speed and control for precision shots."
    },
    {
        id: "7",
        name: "New Balance Men's 806 MC806W",
        category: "Shoes",
        price: 149.95,
        image: "/images/nb-mc806w.webp",
        description: "Classic tennis shoes built for superior motion control, support, and durability."
    },
    {
        id: "8",
        name: "Yonex Power Cushion SHB 65Z 4 White",
        category: "Shoes",
        price: 179.95,
        image: "/images/SHB65Z4MEX-WH-A.webp",
        description: "Features advanced Power Cushion+ technology for incredible shock absorption and repulsion."
    },
    {
        id: "9",
        name: "Asics Men's Gel-Resolution X",
        category: "Shoes",
        price: 199.95,
        image: "/images/1041A481-500-A.webp",
        description: "Ultimate stability and cushioning for players who command the baseline."
    },
    {
        id: "10",
        name: "Yonex Nanoflare 800 PRO Unstrung Deep Green",
        category: "Badminton Racket",
        price: 309.95,
        image: "/images/NF800PROF-A.webp",
        description: "Engineered for lightning-fast speed and sharp, responsive drives."
    },
    {
        id: "11",
        name: "Yonex VCore Alpha 100 SL 245g Strung (8th Gen) Ruby Red",
        category: "Pickleball",
        price: 179.95,
        image: "/images/08VCAPSLScopy.webp",
        description: "Perfect blend of power and spin for intermediate players looking to upgrade their game."
    },
    {
        id: "12",
        name: "Six Zero Double Black Diamond Control 16mm - Black",
        category: "Pickleball",
        price: 179.95,
        image: "/images/HTCPP02916WIRC-001A-A.webp",
        description: "Top-tier control paddle crafted for precision drops, resets, and unshakeable defense."
    }
];
// get SearchLink
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id')
const product = products.find(p => p.id == productId);
if (product) {
    document.getElementById('product-title').innerText = product.name;
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-category').innerText = product.category;
    document.getElementById('product-price').innerText = "$" + product.price + " CAD";
    document.getElementById('product-description').innerText = product.description;
    document.getElementById('product-total').innerText = "$" + product.price + " CAD";
    // Handle total
    const buttonMinus = document.getElementById('btn-minus')
    const buttonPlus = document.getElementById('btn-plus')
    const quantity = document.getElementById('quantity')
    const total = (parseInt(quantity.value) * product.price).toFixed(2)
    document.getElementById('product-total').innerText = "$" + total + "CAD";

    buttonMinus.addEventListener('click', function () {
        if (parseInt(quantity.value) > 1) {
            quantity.value = parseInt(quantity.value) - 1;
        }
        const total = (parseInt(quantity.value) * product.price).toFixed(2)
        document.getElementById('product-total').innerText = "$" + total + "CAD";

    })
    buttonPlus.addEventListener('click', function () {
        quantity.value = parseInt(quantity.value) + 1;
        const total = (parseInt(quantity.value) * product.price).toFixed(2)
        document.getElementById('product-total').innerText = "$" + total + "CAD";
    })
    quantity.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, ''); //avoid copy paste value
        let amount = parseInt(quantity.value);
        if (isNaN(amount)) {
            amount = 0;
        }
        const total = (amount * product.price).toFixed(2);
        document.getElementById('product-total').innerText = "$" + total + "CAD";

    })
    //avoid ". + - * /"
    quantity.addEventListener('keydown', function (event) {
        const forbiddenKeys = ['.', ',', 'e', 'E', '+', '-'];

        if (forbiddenKeys.includes(event.key)) {
            event.preventDefault();
        }
    });
}