const express = require("express");
const heur = require("./heurs.js");

const server = express();
server.use(express.static("public"));

server.get("/", (req, rep) => {
    rep.sendFile("pages/index.html", { root: __dirname });
    console.log("page d'accueil charger a " + heur.getHour());
})

server.listen(3001, () => {
    console.log('port 3001 ouvert');
})