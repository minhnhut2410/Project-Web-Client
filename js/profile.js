const nameValue = document.querySelector(".name-value");
const email = document.querySelector(".email-value");
const user = JSON.parse(localStorage.getItem("currentUser"))

nameValue.textContent = user.fullName;
email.textContent = user.email;
const viewMode = document.querySelector(".view-mode");
const editMode = document.querySelector(".edit-mode");
const inputName = document.getElementById("input-name");
const inputEmail = document.getElementById("input-email");
const btnSave = document.getElementById("button-save");
const btnCancel = document.getElementById("button-cancel");

const btnEdit = document.getElementById("btn-edit");
btnEdit.addEventListener("click", function (e) {
    e.preventDefault();
    btnEdit.style.display = "none";
    viewMode.classList.add("d-none");
    editMode.classList.remove("d-none");
    inputName.value = user.fullName;
    inputEmail.value = user.email;
});
btnSave.addEventListener("click", function (e) {
    e.preventDefault();
    let listUser = JSON.parse(localStorage.getItem("listUser")) || [];
    const userIndex = listUser.findIndex(u => u.email === user.email);
    listUser[userIndex].fullName = inputName.value;
    listUser[userIndex].email = inputEmail.value;
    localStorage.setItem("listUser", JSON.stringify(listUser));

    user.fullName = inputName.value;
    user.email = inputEmail.value;
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Update Successfully");

    nameValue.textContent = user.fullName;
    email.textContent = user.email;
    editMode.classList.add("d-none");
    viewMode.classList.remove("d-none");
    btnEdit.style.display = "";


})
btnCancel.addEventListener("click", function (e) {
    e.preventDefault();
    editMode.classList.add("d-none");
    viewMode.classList.remove("d-none");
    btnEdit.style.display = "";
})
