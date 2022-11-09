import * as $ from './api.js';
// /action/reservation
// /action/livraison
$.getData(data =>{
    document.querySelectorAll(".nbr-abonnee").forEach(abone =>{
        abone.textContent = data.length + " A";
    })
})
console.log("script api");
put_article.forEach(btn =>{
    console.log("boocle faite");
    btn.addEventListener("click", () =>{
        console.log("evenement appeler");
        $.putArticles(btn.getAttribute("data-redirect"));
    })
})