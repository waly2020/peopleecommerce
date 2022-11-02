const express = require("express");
const pool = require("./pool");
const routeAPI = express.Router();
const {getAllData,find} = require("./fonctions");


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

module.exports = routeAPI;