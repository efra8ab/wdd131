const mainnav = document.querySelector(".navigation");
const hamb = document.querySelector("#menu");
const menuIcon = document.querySelector(".menu-icon");

hamb.addEventListener("click", () => {

    mainnav.classList.toggle("show");

    if (mainnav.classList.contains("show")) {
        menuIcon.textContent = "X";
    }

    else {
        menuIcon.textContent = "☰";
    }

});