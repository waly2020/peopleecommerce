const express = require("express");
const pool = require("./pool");
const user = require("./users");
const router = express.Router();
const { routerFunc } = require("./fonctions");

const users = new user();

// connexion
router.post("/login", (req, res, next) => {
    users.login([req.body.username.toLowerCase(), req.body.usernum], (resultat) => {
        if (resultat) {
            req.session.user = resultat;
            req.session.opp = 1;
            res.redirect("/home");
        }
        else {
            res.render("pages/connexions", { data: "connexion", li: false, active: "active", texte: `mot de passe ou nom d'utilisateur incorrecte`, user: null });
        }
    })
})
// creation de compte
router.post("/create", (req, res, next) => {
    let userCreate = {
        name: req.body.name.toLowerCase(),
        numero: req.body.numero,
    }
    users.find([userCreate.name.toLowerCase(), userCreate.numero], resultat => {

        if (resultat) {
            res.render("pages/connexions", { data: "cree_compte", li: false, active: "active", texte: `lutilisateur ${userCreate.name} existe deja`, user: null });
            return;
        }
        else {
            users.create(userCreate, (lastId) => {
                if (lastId) {
                    users.find([userCreate.name.toLowerCase(), userCreate.numero], resultat => {
                        req.session.user = resultat;
                        req.session.opp = 0;
                        res.redirect("/home");
                    })
                } else {
                    res.render("pages/connexions", { data: "cree_compte", li: false, active: "active", texte: `Cree un nouvelle utilisateur`, user: null });
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
router.get("/", (req, res, next) => {
    res.redirect("/home");
});


// page home
router.get("/home", (req, res) => {

    let user = req?.session?.user ?? null;

    let sql = "SELECT * FROM services";

    pool.query(sql, [], (err, table) => {
        if (err) {
            console.log(err);
        }
        res.render("pages/index", { opp: req?.session?.opp ?? null, user: user, li: 1, url: "home", services: table ?? [] });
    })
})
// route de formulaire de connexion ou creation de compte
routerFunc(router, "pages/connexions", "/connexion_:data", { li: false, texte: "", active: "" });

// aboute
routerFunc(router, "pages/about", "/about", { li: 5, url: "about" });

// page commande
routerFunc(router, "pages/commande", "/action/:data", { li: 8, url: "home" });

// page boutique
routerFunc(router, "pages/boutique", "/boutique", { li: 2, url: "boutique" });

// page contact
routerFunc(router, "pages/contacte", "/contacte", { li: 6, url: "contacte", activeStatus: "", color: "", texte: "" });

// page services
// routerFunc(router,"","",{li : 3, url : ""});

router.get("/services", (req, res) => {

    let user = req?.session?.user ?? null;

    let sql = "SELECT * FROM services";

    pool.query(sql, [], (err, table) => {
        if (err) {
            console.log(err);
        }
        res.render("pages/services", { opp: req?.session?.opp ?? null, user: user, li: 3, url: "services", services: table ?? [] });
    })
})

// page blog
routerFunc(router, "pages/blog", "/blog", { li: 4, url: "blog" });

router.get("/commande/:data", (req, res) => {
    let obj = JSON.parse(req.params.data);
    res.render("pages/status-commande", { status: obj.status, commande: obj.commande })
})

module.exports = router;