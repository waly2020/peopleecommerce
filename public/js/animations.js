function setQuantityHtml() {

    let quantiter = 0;
    let prix = 0;

    for (let i = 0; i < panierStorage.length; i++) {
        let article = panierStorage[i];
        if (article) {
            quantiter += article.quantiter;
            prix += (article.prix * article.quantiter);
        }
    }
    quantiterArticle.forEach(para => {
        if (panierStorage.length == 0) {
            para.innerHTML = 0;
            prix_panier.innerHTML = 0;
        }
        else {
            para.innerHTML = quantiter;
            prix_panier.innerHTML = prix;
        }
    })

}
setQuantityHtml();
btn_display.forEach((btn, index, table) => {
    btn.addEventListener("click", () => {

        if (display[index].classList.contains("active")) {
            display[index].classList.remove("active");
        } else {
            for (let i = 0; i < display.length; i++) {
                display[i].classList.remove("active");
            }
            display[index].classList.add("active");
        }

    })
})

btn_panier.forEach(btn => {
    btn.addEventListener("click", () => {
        if (userId) {
            panier.classList.toggle("active");
            shadow.classList.toggle("active");
            managerPanier(btn);
            setQuantity();
        } else {
            shadow_add_user.classList.add("active");
            add_user.classList.add("active");
        }
    });

});

function managerPanier(button) {
    if (button.classList.contains("open")) {

        for (let i = 0; i < panierStorage.length; i++) {
            let article = panierStorage[i];

            if (article) {
                contenerArticlesPanier.innerHTML += `
            <div class="article">
            <img src="../images/upload/${article.image}" alt="${article.titre}">
            <div class="details">
                <p class="titre">${article.titre}</p>
                <p class="prix">${article.prix}FCFA</p>
                <div class="quantiter-produit">
                    <div class="ajouter-produit">
                        <p class="moins action" data-key="${i}">-</p>
                        <p class="nombre set-${i}" data-key="${i}">${article.quantiter}</p>
                        <p class="plus action" data-key="${i}">+</p>
                    </div>
                </div>
            </div>
            </div>
            `;
            }
        }
    } else {
        contenerArticlesPanier.innerHTML = '';
    }
}

function setQuantity() {
    let btn_quantiter = document.querySelectorAll(".action");

    btn_quantiter.forEach((setquantity) => {
        setquantity.addEventListener("click", () => {

            let key = parseInt(setquantity.getAttribute("data-key"));
            let quantiter = document.querySelector(`.set-${key}`);

            if (setquantity.classList.contains("plus")) {
                panierStorage[key].quantiter += 1;
                quantiter.textContent = panierStorage[key].quantiter;
                localStorage.setItem("articles", JSON.stringify(panierStorage));
                setQuantityHtml();

            } else {
                if (panierStorage[key].quantiter > 1) {
                    panierStorage[key].quantiter -= 1;
                    quantiter.textContent = panierStorage[parseInt(setquantity.getAttribute("data-key"))].quantiter;
                    localStorage.setItem("articles", JSON.stringify(panierStorage));
                    setQuantityHtml();
                }
            }

        })
    })
}
// fin animation panier

burger.forEach(btn => {
    btn.addEventListener("click", () => {
        bar_menu.classList.toggle("active");
    })
})
// fin menu mobile
// block add user
btn_close_user.addEventListener("click", () => {
    add_user.classList.toggle("active");
    shadow_add_user.classList.toggle("active");
})

link_abn.forEach(btn => {
    btn.addEventListener("click", e => {
        if (userId) {
            return;
        } else {
            e.preventDefault();
            add_user.classList.toggle("active");
            shadow_add_user.classList.toggle("active");
        }
    })
})

deleteStorage.forEach(btn => {
    btn.addEventListener("click", () => {
        contenerArticlesPanier.innerHTML = '';
        localStorage.removeItem("articles");
        dataLocalStorage = JSON.parse(localStorage.getItem("articles")) ?? [];
        panierStorage = [...dataLocalStorage];
        setQuantityHtml();
    })
})