let contenerArticles = document.querySelector(".contener-articles.section");
let dataLocalStorage = JSON.parse(localStorage.getItem("articles")) ?? [];
let panierStorage = [...dataLocalStorage];
let userId = document.querySelector(".user-bar-menu").getAttribute("data-userId");

// animation page commande
const btn_display = document.querySelectorAll(".add_input");
const display = document.querySelectorAll(".display");

// animations panier
const btn_panier = document.querySelectorAll(".display-panier");
const shadow = document.querySelector(".shadow");
const panier = document.querySelector(".panier");
let contenerArticlesPanier = document.querySelector(".contener-articles.paniers");

// add user
const add_user = document.querySelector(".add-user");
const shadow_add_user = document.querySelector(".shadow-add-user");
const btn_close_user = document.querySelector(".close-add-user");

// menu mobile
const burger = document.querySelectorAll(".burger");
const bar_menu = document.querySelector(".bar-menu");

// boutons d'abonnement
const link_abn = document.querySelectorAll(".link-abonne");