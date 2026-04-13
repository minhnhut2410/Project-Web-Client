const searchButton = document.getElementById("search-btn");
searchButton.addEventListener("click", function() {
    localStorage.setItem("focusSearch", true);
    window.location.href ="product.html";
})