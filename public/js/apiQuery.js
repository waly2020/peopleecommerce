let nbrArticle = null;

fetch(`${host}api/get-articles`).then(res => {
    if (res.ok) {
        res.json().then(articles => {
            // start for
            let randomArticle = Math.floor(Math.random() * articles.length);

            try {
                header_article.innerHTML = `
                    <div class="titre-article">${articles[randomArticle].nom}</div>
                    <img src="../images/upload/${articles[randomArticle].image}" alt="">
                    <div class="content-prix">
                    <p>${articles[randomArticle].prix} F</p>
                    </div>
                    <div class="contener-add-panier">
                    <div class="add-panier add_panier" data-id="${randomArticle}">+</div>
                   `;
                if (articles.length >= 8) {
                    nbrArticle = 7;
                }
            } catch (error) {
                nbrArticle = articles.length - 1;
            }

            for (let i = nbrArticle ?? articles.length - 1; i >= 0; i--) {
                let article = articles[i];
                contenerArticles.innerHTML += `
                <div class="carte-article">
                  <div class="img-article">
                    <img src="../images/upload/${article.image}" alt="">
                  </div>
                  <div class="info-article">
                    <p class="titre-article">- ${article.nom} -</p>
                    <p class="prix">${article.prix} F</p>
                 </div>
                 <div class="contener_add_panier">
                    <div class="add_panier" data-id="${i}">+</div>
                 </div>
                </div>
                `;
                console.log("article api");
            }
            document.querySelectorAll(".add_panier").forEach((btn) => {
                btn.addEventListener("click", () => {

                    let articleId = parseInt(btn.getAttribute("data-id"));

                    if (panierStorage[articleId] == undefined) {

                        if (userId) {
                            panierStorage[articleId] = {
                                userid: parseInt(userId),
                                articleid: articles[articleId].id,
                                titre: articles[articleId].nom,
                                prix: articles[articleId].prix,
                                quantiter: 1,
                                image: articles[articleId].image,
                            };
                            localStorage.setItem("articles", JSON.stringify(panierStorage));
                            setQuantityHtml();
                        } else {
                            shadow_add_user.classList.add("active");
                            add_user.classList.add("active");
                        }
                    } else {
                        return;
                    }

                })
            })

        })
    }
});