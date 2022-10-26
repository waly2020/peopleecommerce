const express = require("express");
const pool = require("./pool");
const routeAPI = express.Router();
// recupere la data
function getAllData(table, callback) {
    pool.query(`SELECT * FROM ${table}`, [], (err, resultat) => {
        if (err) {
            console.log(`n'as pas pue recuperer les donnees de ${table}`);
            callback(null);
        } else {
            console.log(`donnees de ${table} recuperer`);
            callback(resultat);
        }
    })
}

routeAPI.get("/api/get-articles", (req, res) => {
    getAllData("articles", (table) => {
        res.send(table);
    })
})

// routeAPI.get("/panier/:table", (req, res, next) => {

//     let panier = JSON.parse(req.params.table);

//     let sql = `INSERT INTO panier (userid,articleid,titre,prix,quantiter,image) VALUES (?,?,?,?,?,?)`;
//     for (let i = 0; i < panier.length; i++) {
//         let ate = panier[i];
//         pool.query(sql, [ate.userid, ate.articleid, ate.titre, ate.prix, ate.quantiter, ate.image], (err) => {
//             if (err) {
//                 console.log("donnee non ajouter :(");
//                 throw err;
//             } else {
//                 console.log("donnees ajouter :)");
//             }
//         })
//     }

//     if (req.params.table) {
//         res.status(200).redirect("/deconnexion");
//         console.log("tout a ete ajouter");
//     }
//     // res.status(200).send("bien recu :)");

// })

module.exports = routeAPI;