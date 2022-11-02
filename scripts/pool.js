const util = require("util");
const mysql = require("mysql");

// const pool = mysql.createPool({
//     user : "waly",
//     database : "waly_mont_bouet_gabon",
//     host : "mysql-waly.alwaysdata.net",
//     password : "walyledev2022",
//     connectionLimit : 10
// });
const pool = mysql.createPool({
    user : "waly",
    database : "marche-mont-bouet-gabon",
    host : "postgres://waly:JMJN91hoZgeFx1Kd6FrA6luDjbB6eGiT@dpg-cdh2v5qen0hl21kptpug-a.oregon-postgres.render.com/montbouet",
    port : 5432,
    password : "JMJN91hoZgeFx1Kd6FrA6luDjbB6eGiT",
    connectionLimit : 10
});

pool.getConnection((err,connexion)=>{
    if(err) throw err;
    if(connexion){
        console.log("connecter a la bdd");
        connexion.release();
    }
})
pool.query = util.promisify(pool.query);
module.exports = pool;