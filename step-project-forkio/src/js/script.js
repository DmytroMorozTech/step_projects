// const menuBtn = document.querySelector(".header__btn");
// const navLinks = document.querySelector(".header__links");
// const links = document.querySelectorAll(".header__links li");
//
// menuBtn.addEventListener("click", () => {
//     navLinks.classList.toggle("open");
//     menuBtn.classList.toggle("open");
//     links.forEach(link => {
//         link.classList.toggle("fade-in");
//     })
// })

// Этот код можно использовать для выпадающего меню hamburger-button.

const hamburgerBtn = document.querySelector('.navbar__btn');
const menuList = document.querySelector('.navbar__menu');

hamburgerBtn.addEventListener('click', () => menuList.classList.toggle('active'));