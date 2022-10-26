const express = require("express");
const pool = require("./pool");
const user = require("./users");
const router = express.Router();

const users = new user();

router.get("/", (req, res) => {
    let user = req?.session?.user;
    if (user) {
        console.log(user);
        res.render("pages/index", { opp: req.session.opp, user: user });
    } else {
        console.log("aucune session ouverte");
        res.render("pages/index", { opp: null, user: null });
    }
})
// page d'ajout de numero
router.get("/numero", (req, res, next) => {
    let user = req?.session?.user;
    res.render("pages/addnumber", { opp: req.session.opp, user: user });
})
// route d'ajout de numero
router.post("/add_number/:id", (req, res, next) => {
    let { id } = req.params;
    let sql = `UPDATE users SET numero = ? WHERE id = ?`;
    pool.query(sql, [req.body.numero, id], (err) => {
        if (err) {
            console.log("n'as pas pue modifier le numero de l'utilisateur");
            throw err;
        } else {
            console.log('numero modifier');
            res.redirect("/")
        }
    })
})
// route de formulaire de connexion ou creation de compte
router.get("/connexion_:form", (req, res, next) => {
    let form = req.params.form
    res.render("pages/connexions", { user: null, form: form });
})
// connexion
router.post("/login", (req, res, next) => {
    console.log(req.body);
    users.login([req.body.username, req.body.usernum],(resultat) => {
        if (resultat) {
            req.session.user = resultat;
            req.session.opp = 1;
            res.redirect("/");
        }
        else {
            res.send("mot de passe ou nom d'utilisateur incorrecte...");
        }
    })
})
// creation de compte
router.post("/create", (req, res, next) => {
    console.log(req.body);
    let userCreate = {
        name: req.body.name,
        numero : req.body.numero,
    }
    console.log(userCreate);
    users.find([userCreate.name, userCreate.numero], resultat => {

        if (resultat) {
            res.send("lutilisateur " + userCreate.name + " existe deja");
            return;
        }
        users.create(userCreate, (lastId) => {
            if (lastId) {
                users.find([userCreate.name, userCreate.numero], resultat => {
                    req.session.user = resultat;
                    req.session.opp = 0;
                    res.redirect("/");
                })
            } else {
                res.send("Cree un nouvelle utilisateur !!");
            }
        })
    })
})
// deconnexion
router.get('/deconnexion', (req, res, next) => {
    if (req.session.user) {
        req.session.destroy(() => {
            res.redirect("/");
        })
    }
})
// page commande
router.get("/action/:forms", (req, res, next) => {
    let user = req?.session?.user;
    res.render("pages/commande", { opp: req.session.opp, user: user , forms : req.params.forms});
})
// page commange
router.get("/boutique",(req,res,next) =>{
    let user = req?.session?.user;
    res.render("pages/boutique", { opp: req.session.opp, user: user , forms : req.params.forms});
})
module.exports = router;