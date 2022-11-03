const util = require("util");
const mysql = require("mysql");

const pool = mysql.createPool({
    user : "monbouet",
    database : "monbouet_gabon",
    host : "mysql-monbouet.alwaysdata.net",
    password : "walyledev2022",
    connectionLimit : 10
});

// const pool = mysql.createPool({
//     user : "root",
//     database : "people_db",
//     host : "localhost",
//     port : 3306,
//     password : "",
//     connectionLimit : 10
// });


pool.getConnection((err,connexion)=>{
    if(err) throw err;
    if(connexion){
        console.log("connecter a la bdd");
        connexion.release();
    }
})
pool.query = util.promisify(pool.query);
module.exports = pool;