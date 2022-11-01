const pool = require("./pool");


function routerFunc(router, render, url, params = {}) {
    router.get(url, (req, res, next) => {

        let user = req?.session?.user ?? null;
        let reqParm = req?.params?.data ?? null;

        res.render(render, { opp: req?.session?.opp ?? null, user: user, data: reqParm, ...params });
    })
}

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
// -------------------
function getTable (tableName,callback){

    pool.query(`SELECT * FROM ${tableName}`, [], (err, resultat) => {

        if (err) {
            console.log("n'as pas pue recuperer la data");
            return null;
        }else{
        console.log("recuperer :)");
        callback(resultat);
        }
    })
}
// ----------------------------
function getTables (callback,...tables){

    let resultat = [],bool = false;

    for (let i = 0; i < tables.length; i++){
        let table = tables[i];
        getAllData(table,rest =>{
            resultat.push(rest);
            if(resultat.length == tables.length){
                bool = true;
                callback(resultat,bool);
                console.log("bool est vrai");
            }
        })
    }
}
// cherche un element dans la bg
function find(id, callback) {

    let field = 'id';
    let sql = `SELECT * FROM users WHERE ${field} = ?`;
     
    pool.query(sql,id, (err, resultat) => {
        if (err) {
            throw err;
        }
        callback(resultat[0]);
    })
}
// delete
function suprimer(id,table){

}
module.exports = {routerFunc,getAllData,find,getTable,getTables};