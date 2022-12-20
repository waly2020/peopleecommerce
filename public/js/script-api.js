import * as $ from './api.js';
// /action/reservation
// /action/livraison
$.getData(data => {
    document.querySelectorAll(".nbr-abonnee").forEach(abone => {
        abone.textContent = data.length + " A";
    })
})
put_article.forEach(btn => {
    btn.addEventListener("click", () => {
        $.putArticles(btn.getAttribute("data-redirect"));
    })
})