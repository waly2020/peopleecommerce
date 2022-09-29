const express = require("express");
const heur = require("./heurs.js");
const ejs = require("ejs");
const server = express();
const mysql = require("mysql");
const myconnection = require("express-myconnection");

const options_db = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'people_db'
}

server.use(myconnection(mysql, options_db, 'pool'));

server.use(express.static("public"));
server.set('view engine', 'ejs');
server.set("views", 'public');

heur.getDatas(server,'/','index');

heur.getDatas(server,'/boutique','boutique');

server.listen(3001, () => {
    console.log('port 3001 ouvert');
})