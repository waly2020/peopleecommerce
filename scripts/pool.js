const util = require("util");
const mysql = require("mysql");

const pool = mysql.createPool({
    user : process.env.DB_USER,
    database : process.env.DATABASE,
    host : process.env.HOST,
    password : process.env.PASSWORD,
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