/**
 * <div class="img-article active" data-position="1">
                        <p class="quantiter">10</p>
                        <img src="../images/haut.png" alt="">
                    </div>
 */
// page commande
let dataLocalStorage = JSON.parse(localStorage.getItem("articles")) ?? [];
let panierStorage = [...dataLocalStorage];
const contenerArticleCommande = document.querySelector(".photo");

for (let i = 0; i < panierStorage.length; i++) {
    let article = panierStorage[i];

    contenerArticleCommande.innerHTML += `
          <div class="img-article ${i == 0 ? "active" : ""}" data-position="${i + 1}">
                
                <p class="titre-article">${article.titre}</p>
                <p class="prix-article">${article.prix} FCFA <span class="quantiter">${article.quantiter}</span> </p>
                <img src="../images/${article.image}" alt="${article.titre}">

        </div>
    `;
}

let slide_img = 0;
const btn_slide_img = document.querySelectorAll(".btn-slide-article");
const array_img = document.querySelectorAll(".img-article");
const soldes = document.querySelectorAll(".sold");

btn_slide_img.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.classList.contains("btn-right")) {
            if (slide_img < array_img.length - 1) {
                slide_img += 1;
            }
        } else {
            if (slide_img > 0) {
                slide_img -= 1;
            }
        }
        for (let a = 0; a < array_img.length; a++) {
            array_img[a].classList.remove("active");
        }
        array_img[slide_img].classList.add("active");
    })
})
// fin animation page commande

let sold = {
    quantiter : (function(){
        let quant = 0;
        for(let c of panierStorage){
            quant += c.quantiter;
        }
        return quant;
    })(),
    prix : (function(){
        let prix = 0;
        for(let c of panierStorage){
            prix += (c.prix * c.quantiter);
        }
        return prix;
    })(),
}

soldes.forEach(item =>{
    item.textContent = sold[item.getAttribute("data-solde")];
})