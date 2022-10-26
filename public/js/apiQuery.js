/**
 * articles panier
 * 
let articlePanier = {
    userId : 1,
    articleId : 1,
    titre : "sac a main",
    prix : 10000,
    quantiter : 3,
    image : "2022-10-12:10-20.png",
}
*/

// const { post } = require("../../scripts/routes");

/**
 *  HTML articles panier.
 * 
         <div class="article">
            <img src="../images/haut.png" alt="haut teste">
            <div class="details">
                <p class="titre">Haut Noir</p>
                <p class="prix">70.OOOOFCFA</p>
                <div class="quantiter-produit">
                    <p class="titre-quantiter">Quantiter</p>
                    <div class="ajouter-produit">
                        <p class="moins action">-</p>
                        <p class="nombre">1</p>
                        <p class="plus action">+</p>
                    </div>
                </div>
            </div>
        </div>
 */
fetch("http://localhost:3001/api/get-articles").then(res => {
    if (res.ok) {
        res.json().then(articles => {

            for (let i = 0; i < articles.length; i++) {
                let article = articles[i];
                contenerArticles.innerHTML += `
                <div class="carte-article">
                  <div class="img-article">
                    <img src="images/haut.png" alt="">
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

if (userId) {
    console.log('utilisateur connecter avec l\'id : ' + userId);
} else {
    console.log("utilisateur non connecter");
}