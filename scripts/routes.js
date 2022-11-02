const express = require("express");
const pool = require("./pool");
const routeAPI = express.Router();
const {getAllData,find} = require("./fonctions");

pool.connect();
pool.query("CREATE TABLE users(id INT PRIMARY KEY SERIAL,name VARCHAR(80),numero INT,images VARCHAR(100),isabonne BOOLEAN,dateCreation DATE)",(err)=>{
    if(err){
        console.log("n'as pas pue cree la table");
        console.log(err);
    }else{
        console.log("table cree");
    }
})
pool.end();
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