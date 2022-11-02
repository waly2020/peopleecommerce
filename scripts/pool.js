const util = require("util");
const {Client} = require("pg");

const pool = new Client({
    user : "waly",
    database : "marche-mont-bouet-gabon",
    host : "postgres://waly:JMJN91hoZgeFx1Kd6FrA6luDjbB6eGiT@dpg-cdh2v5qen0hl21kptpug-a/montbouet",
    port : 5432,
    password : "JMJN91hoZgeFx1Kd6FrA6luDjbB6eGiT",
});

// pool.getConnection((err,connexion)=>{
//     if(err) throw err;
//     if(connexion){
//         console.log("connecter a la bdd");
//         connexion.release();
//     }
// })

pool.connect();


pool.query = util.promisify(pool.query);
module.exports = pool;