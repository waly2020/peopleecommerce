const express = require("express");
const pool = require("./pool");
const routeAPI = express.Router();
const {getAllData,find,routerSession} = require("./fonctions");
const localStorage = require("./storage");


routeAPI.get("/api/get-articles", (req, res) => {
    getAllData("articles", (table) => {
        res.send(table);
    })
})
routeAPI.get("/api/get-abonnes",(req,res) =>{
    let sql = 'SELECT * FROM users WHERE isabonne = TRUE';
    pool.query(sql,[],(err,users) =>{
        if (err) throw err;
        res.send(users);
    })
})

routeAPI.get("/abonne/:id/:abonne/:url",(req,res) =>{
    
    const {id,abonne,url} = req.params;

        let sql = `UPDATE users SET isabonne = ? WHERE id = ?`;
        pool.query(sql, [abonne == 1 ? 0 : 1, id], (err) => {
            if (err) {
                throw err;
            } else {
                find(id,user =>{
                    req.session.user = user;
                    res.redirect(`/${url}`);
                })
            }
        })
})

routeAPI.get("/api-add-to-panier/:article/:id",(req,res) =>{
    let articles = req.params.article;
    let userId = req.params.id;
    localStorage.setItem(`articles-${userId}`,articles);
})
routeAPI.post("/send-message",(req,res) =>{
    let sql = "INSERT INTO contacte (nom,numero,message) VALUES (?,?,?)";
    pool.query(sql,[req.body.nom,req.body.numero,req.body.message],(err) =>{
        if(err){
            routerSession(req,res,"pages/contacte",{li : 6, url : "contacte",activeStatus : "active", color : "error", texte : "Une erreur ses produit lor de l'envoie :("});
        }else{
            routerSession(req,res,"pages/contacte",{li : 6, url : "contacte",activeStatus : "active", color : "succes", texte : "Nous avons bien recu votre message : )"});
        }
    })
})
module.exports = routeAPI;