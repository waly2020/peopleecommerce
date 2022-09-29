/**
 * recupere l'heur actuel.
 * @return {string}
 */
function getHour() {
    const d = new Date();
    return `${d.getHours()}H : ${d.getMinutes()}M : ${d.getSeconds()}S.`;
}
/**
 * 
 * @param {function} server le serveur local
 * @param {string} page chemin url de la page
 */
function getDatas(server,apiLink,page){
    server.get(`${apiLink}`, (req, rep) => {
        req.getConnection((err, connect) => {
            if (err) {
                console.log("impossible de se connecter a la base de donnee");
                console.log(err)
            } else {
                console.log("connecter a la base de donnee");
                connect.query('SELECT * FROM articles', [], (err, res) => {
                    if (err) {
                        console.log("donnee non recupere");
                    }
                    else {
                        console.log("donnee recupeere");
                        rep.status(200).render(`pages/${page}`, { res });
                        // rep.send(res);
                    }
                })
            }
        })
        console.log(`page ${page} charger a ` + getHour());
    })
}

module.exports = {
    getHour,
    getDatas,
}