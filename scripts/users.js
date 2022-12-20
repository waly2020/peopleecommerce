const pool = require("./pool");

class User {
    constructor() {
        return
    }
    /**
     * cherche un utilisateur dans la base de donne
     * @param {['user name','user email']} user l'utilisateur a chercher
     * @param {function (resultat)} callback function de retour
     */
    find(users, callback) {

        let field = ['name', 'numero'];
        let sql = `SELECT * FROM users WHERE ${field[0]} = ? AND ${field[1]} = ?`;

        pool.query(sql, users, (err, resultat) => {
            if (err) {
                throw err;
            } else {
                callback(resultat[0]);
            }

        })
    }
    create(body, callback) {

        var values = [];

        for (let prop in body) {
            values.push(body[prop].toLowerCase());
        }

        let sql = `INSERT INTO users (name,numero,image,isabonne) VALUES (?,?,'user-${Math.floor(Math.random() * 4)}.png',FALSE)`;

        pool.query(sql, values, (err, lastId) => {
            if (err) throw err;
            callback(lastId);
        });
    }
    /**
     * 
     * @param {['name','numero']} userDatas 
     * @param {function(resultat)} callback 
     */
    login(userDatas, callback) {

        this.find(userDatas, (resultat) => {
            if (resultat) {
                callback(resultat);
                return;
            } else {
                callback(null);
            }

        })
    }
}

module.exports = User;