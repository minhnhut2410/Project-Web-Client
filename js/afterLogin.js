window.addEventListener("load", function () {
    //handle after login
    if (localStorage.getItem("currentUser")) {
        const buttonLogin = document.getElementById("btn-login");
        buttonLogin.innerHTML = "";
        buttonLogin.classList.remove("btn-login");
        buttonLogin.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
        buttonLogin.href = "profile.html"
        buttonLogin.classList.add("user-icon")
        const buttonLogOut = document.createElement("a");
        buttonLogOut.classList.add("btn-login");
        buttonLogOut.innerText = "Log Out"
        const headerActions = document.querySelector(".header-actions")

        headerActions.appendChild(buttonLogOut)

        buttonLogOut.addEventListener("click", function () {
            localStorage.removeItem("currentUser");
            window.location.reload();
        })

    }
})