const express = require("express");
const pool = require("./pool");
const user = require("./users");
const router = express.Router();
const {routerFunc} = require("./fonctions");

const users = new user();

// connexion
router.post("/login", (req, res, next) => {
    console.log(req.body);
    users.login([req.body.username, req.body.usernum], (resultat) => {
        if (resultat) {
            req.session.user = resultat;
            req.session.opp = 1;
            res.redirect("/home");
        }
        else {
            res.send("mot de passe ou nom d'utilisateur incorrecte...");
        }
    })
})
// creation de compte
router.post("/create", (req, res, next) => {
    let userCreate = {
        name: req.body.name,
        numero: req.body.numero,
    }
    users.find([userCreate.name, userCreate.numero], resultat => {

        if (resultat) {
            res.send("lutilisateur " + userCreate.name + " existe deja");
            return;
        }
        else{
            users.create(userCreate, (lastId) => {
                if (lastId) {
                    users.find([userCreate.name, userCreate.numero], resultat => {
                        req.session.user = resultat;
                        req.session.opp = 0;
                        res.redirect("/home");
                    })
                } else {
                    res.send("Cree un nouvelle utilisateur !!");
                }
            })
        }
    })
})
// deconnexion
router.get('/deconnexion', (req, res, next) => {
    if (req.session.user) {
        req.session.destroy(() => {
            res.redirect("/home");
        })
    }
})
// --------
router.get("/",(req,res,next)=>{
    res.redirect("/home");
})

// page home
routerFunc(router, "pages/index", "/home",{li : 1, url : "home"});

// route de formulaire de connexion ou creation de compte
routerFunc(router, "pages/connexions", "/connexion_:data",{li : false});

// aboute
routerFunc(router, "pages/about", "/about", { li: 5, url : "about" });

// page commande
routerFunc(router, "pages/commande", "/action/:data",{li : 8, url : "home"});

// page boutique
routerFunc(router, "pages/boutique", "/boutique",{li : 2, url : "boutique"});

// page contact
routerFunc(router,"pages/contacte","/contacte",{li : 6, url : "contacte"});

// page services
routerFunc(router,"pages/services","/services",{li : 3, url : "services"});

// page blog
routerFunc(router,"pages/blog","/blog",{li : 4, url : "blog"});

// page status de commande
routerFunc(router,"pages/status-commande","/status",{status : "sucess",commande : "livraison"});

module.exports = router;