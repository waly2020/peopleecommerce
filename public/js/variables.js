let contenerArticles = document.querySelector(".contener-articles.section");
let dataLocalStorage = JSON.parse(localStorage.getItem("articles")) ?? [];
let panierStorage = [...dataLocalStorage];
let put_article = document.querySelectorAll(".put-article-to-panier");
let btn_restore = document.querySelectorAll(".restore");
// https://marche-mont-bouet.onrender.com/home
// let host = "http://localhost:10000/";
let host = " https://marche-mont-bouet.onrender.com/";
let userId = document.querySelector(".user-bar-menu").getAttribute("data-userId");

// contener article aleatoire
const header_article = document.querySelector(".header-article");

// animation page commande
const btn_display = document.querySelectorAll(".add_input");
const display = document.querySelectorAll(".display");

// animations panier
const btn_panier = document.querySelectorAll(".display-panier");
const shadow = document.querySelector(".shadow");
const panier = document.querySelector(".panier");
let contenerArticlesPanier = document.querySelector(".contener-articles.paniers");
let deleteStorage = document.querySelectorAll(".delete");
let quantiterArticle = document.querySelectorAll(".quant");
let prix_panier = document.querySelector(".prix_panier");

// add user
const add_user = document.querySelector(".add-user");
const shadow_add_user = document.querySelector(".shadow-add-user");
const btn_close_user = document.querySelector(".close-add-user");

// menu mobile
const burger = document.querySelectorAll(".burger");
const bar_menu = document.querySelector(".bar-menu");

// boutons d'abonnement
const link_abn = document.querySelectorAll(".link-abonne");
/**
 * 
 * @param {HTMLElement} btn button
 */
function restore(btn) {
    btn.addEventListener("click", () => {
        localStorage.removeItem("articles");
    })
}
btn_restore.forEach(btn => {
    restore(btn);
})