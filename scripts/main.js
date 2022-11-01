const express = require("express");
const session = require("express-session");
const server = express();
const path = require("path");
const ejs = require("ejs");
const routerPages = require("./pages");
const routeAPI = require("./routes");
const routeAdmin = require("../scripts-admin/routes");


server.use(express.static("public"));
server.use(express.urlencoded({extended : false}));

server.set("views","public");
server.set("view engine", "ejs");

// session
server.use(session({
    secret : "site_mon_bouet",
    resave : false,
    saveUninitialized : true,
    cookie : {
        maxAge : 60 * 1000 * 30,
    }
}));

server.use("/",routerPages);
server.use("/",routeAPI);
server.use("/",routeAdmin);
// page 404
server.use((req,res,next) =>{
    res.status(404);
    res.send("Page non trouver");
})
server.listen(process.env.PORT,() => console.log("port 3001 ouvert"));

module.exports = server;