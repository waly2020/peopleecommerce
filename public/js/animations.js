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
        if(userId){
          panier.classList.toggle("active");
          shadow.classList.toggle("active");
          managerPanier(btn);
          setQuantity();
        }else{
            shadow_add_user.classList.add("active");
            add_user.classList.add("active");
        }
    });

});

function managerPanier(button) {
    if (button.classList.contains("open")) {
        console.log("open");

        for (let i = 0; i < panierStorage.length; i++) {

            let article = panierStorage[i];

            contenerArticlesPanier.innerHTML += `
            <div class="article">
            <img src="../images/haut.png" alt="haut teste">
            <div class="details">
                <p class="titre">${article.titre}</p>
                <p class="prix">${article.prix}FCFA</p>
                <div class="quantiter-produit">
                    <p class="titre-quantiter">Quantiter</p>
                    <div class="ajouter-produit">
                        <p class="moins action" data-key="${i}">-</p>
                        <p class="nombre" data-key="${i}">${article.quantiter}</p>
                        <p class="plus action" data-key="${i}">+</p>
                    </div>
                </div>
            </div>
            </div>
            `
        }
    } else {
        console.log("close");
        contenerArticlesPanier.innerHTML = '';
    }
}

function setQuantity() {
    let btn_quantiter = document.querySelectorAll(".action");
    let quantiter = document.querySelectorAll(".nombre");

    btn_quantiter.forEach((setquantity) => {
        setquantity.addEventListener("click", () => {

            if (setquantity.classList.contains("plus")) {
                console.log("plus");
                panierStorage[parseInt(setquantity.getAttribute("data-key"))].quantiter += 1;
                quantiter[parseInt(setquantity.getAttribute("data-key"))].textContent = panierStorage[parseInt(setquantity.getAttribute("data-key"))].quantiter;
                localStorage.setItem("articles", JSON.stringify(panierStorage));
            } else {
                console.log("moins");
                if (panierStorage[parseInt(setquantity.getAttribute("data-key"))].quantiter > 1) {
                    panierStorage[parseInt(setquantity.getAttribute("data-key"))].quantiter -= 1;
                    quantiter[parseInt(setquantity.getAttribute("data-key"))].textContent = panierStorage[parseInt(setquantity.getAttribute("data-key"))].quantiter;
                    localStorage.setItem("articles", JSON.stringify(panierStorage));
                }
            }
        })
    })
}
// fin animation panier

burger.forEach(btn => {
    btn.addEventListener("click", () => {
        bar_menu.classList.toggle("active");
        console.log("canges");
    })
})
// fin menu mobile
// block add user
btn_close_user.addEventListener("click", () => {
    add_user.classList.toggle("active");
    shadow_add_user.classList.toggle("active");
})