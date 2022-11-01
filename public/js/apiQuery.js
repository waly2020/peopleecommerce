fetch("http://localhost:3001/api/get-articles").then(res => {
    if (res.ok) {
        res.json().then(articles => {

            for (let i = 0; i < articles.length; i++) {
                let article = articles[i];
                contenerArticles.innerHTML += `
                <div class="carte-article">
                  <div class="img-article">
                    <img src="../images/upload/${article.image}" alt="">
                  </div>
                  <div class="info-article">
                    <p class="titre-article"> ${article.nom}</p>
                    <p class="prix">${article.prix}</p>
                 </div>
                 <div class="contener_add_panier">
                    <div class="add_panier">+</div>
                 </div>
                </div>
                `;
                // console.log("element ajouter " + article.id);
            }
            // document.onload
            document.querySelectorAll(".add_panier").forEach((btn, key, paren) => {
                btn.addEventListener("click", () => {

                    if (panierStorage.includes(panierStorage[key])) {
                        return;
                    } else {
                        if (userId) {
                            panierStorage.push({
                                userid: parseInt(userId),
                                articleid: articles[key].id,
                                titre: articles[key].nom,
                                prix: articles[key].prix,
                                quantiter: 1,
                                image: "2022-10-12.png",
                            });
                            console.log(panierStorage);
                            localStorage.setItem("articles", JSON.stringify(panierStorage));
                        }else{
                            shadow_add_user.classList.add("active");
                            add_user.classList.add("active");
                        }
                    }

                })
            })

        })
    } else {
        console.log("donnee non recupere");
    }
});