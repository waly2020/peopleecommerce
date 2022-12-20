const contenerArticleCommande = document.querySelector(".photo");
const send = document.getElementById("send");
const loader = document.querySelector(".loading");
const inputs = document.querySelectorAll("input");
let canload = false;

let active = true;

for (let i = 0; i < panierStorage.length; i++) {
    let article = panierStorage[i];

    if (article) {
        contenerArticleCommande.innerHTML += `
          <div class="img-article ${active == true ? "active" : ""}" data-position="${i + 1}">
                
                <p class="titre-article">${article.titre}</p>
                <p class="prix-article">${article.prix} FCFA <span class="quantiter">${article.quantiter}</span> </p>
                <img src="../images/upload/${article.image}" alt="${article.titre}">

        </div>
    `;
        active = false;
    }

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
    quantiter: (function () {
        let quant = 0;
        for (let c of panierStorage) {
            if (c) {
                quant += c.quantiter;
            }
        }
        return quant;
    })(),
    prix: (function () {
        let prix = 0;
        for (let c of panierStorage) {
            if (c) {
                prix += (c.prix * c.quantiter)
            }
        }
        return prix;
    })(),
}

soldes.forEach(item => {
    item.textContent = sold[item.getAttribute("data-solde")];
})

send.addEventListener("click", e => {
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        if (input.value) {
            canload = true;
        } else {
            canload = false;
        }
    }
    if (canload) {
        loader.classList.add("active");
    }
    else {
        e.preventDefault();
    }
})