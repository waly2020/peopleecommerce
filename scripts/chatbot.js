const express = require("express");
const routChatBot = express.Router();
const localStorage = require("./storage");
const pool = require("./pool");

routChatBot.post("/api/commande/:commande/:user", (req, res) => {

    let commande = req.params.commande;
    let user = JSON.parse(req.params.user);
    let body = req.body;

    let sql = `INSERT INTO commande (nom,numero,type,articles,details) VALUES (?,?,?,?,?)`;

    pool.query(sql, [user.name, user.numero, commande, localStorage.getItem(`articles-${user.id}`), JSON.stringify(body)], (err) => {
        if (err) {
            res.redirect(`/commande/${JSON.stringify({ status: "error", commande: commande })}`);
        } else {
            res.redirect(`/commande/${JSON.stringify({ status: "succes", commande: commande })}`);
        }
    })
})

module.exports = routChatBot;