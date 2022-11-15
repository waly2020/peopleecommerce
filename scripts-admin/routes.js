const express = require("express");
const pool = require("../scripts/pool");
const routeAdmin = express.Router();
const multer = require("multer");
const path = require("path");
const $ = require("../scripts/fonctions");
const bcrypt = require("bcrypt");

const storage = multer.diskStorage({
    destination : path.join('public','images','upload'),
    filename : (req,file,callback) =>{
        callback(null,`${file.fieldname}-${Date.now()}${file.originalname}`);
        // console.log(file);
    }
})

let upload = multer({
    storage : storage,
    limits : {
        fileSize : 3_000_000,
    },
    fileFilter : (req,file,callback) =>{
        const regex = /jpg|jpeg|png|svg/;
        const check = regex.test(path.extname(file.originalname));
        const checkmine = regex.test(file.mimetype);

        if(check && checkmine){
            callback(null,true);
        }else{
            callback("image seulement"); 
        }
    }
}).single("image");
 
routeAdmin.post("/add/aricle",(req,res) =>{
    upload(req,res,err =>{
        if(err){
            res.render("admin/error",{error : err});
        }else{
            if(req.file !== undefined){
                let sql = `INSERT INTO articles (nom,prix,categorie,image) VALUES (?,?,?,?)`;
                pool.query(sql,[req.body.nom,req.body.prix,req.body.categories,req.file.filename],(err)=>{
                    if(err){
                        res.render("admin/error",{error : err});
                    }else{
                        // res.render("admin/succes",{file : req.file.filename,article : req.body});
                        res.redirect("/admin");
                    }
                })
            }else{
                res.render("admin/error",{error : "Le champ de l'image est vide"})
            }
        }
    })
})

routeAdmin.post("/add-services",(req,res) =>{
    upload(req,res,err =>{
        if(err){

            res.render("admin/error",{error : err});

        }else{

            if(req.file !== undefined){

                let sql = `INSERT INTO services (nom,description,image) VALUES (?,?,?)`;

                pool.query(sql,[req.body.nom,req.body.description,req.file.filename],(err)=>{
                    if(err){
                        res.render("admin/error",{error : err});
                    }else{
                        // res.render("admin/succes",{file : req.file.filename,article : req.body});
                        res.redirect("/admin");
                    }
                })

            }else{
                res.render("admin/error",{error : "Le champ de l'image est vide"})
            }
        }
    })
})

routeAdmin.post("/add-admin/:name/:password",(req,res) =>{
    let {name,password} = req.params;

    let pass = bcrypt.hashSync(password,10);
    console.log(pass);

    let sql = `INSERT INTO admin (nom,password) VALUES (?,?)`;
    pool.query(sql,[name,pass],(err =>{
        if(err){
            console.log(err);
        }else{
            res.send("admin ajouter");
        }
    }))
});

routeAdmin.post("/admin-login",(req,res) =>{
    let {nom,password} = req.body;

    let sql = `SELECT * FROM admin WHERE nom = ?`;

    pool.query(sql,nom,(err,resultat) =>{
        if(err){
            res.render("admin/connexion",{error : "active", texte : `quelques chose ses mal passe veuillez ressayer plus tard :(`});
            return;
        }else{
            // console.log(resultat[0]);
           if(resultat.length){
            if(bcrypt.compareSync(password,resultat[0].password)){
                req.session.admin = resultat[0];
                res.redirect("/admin");
            }else{
                res.render("admin/connexion",{error : "active", texte : "Mot de passe incorecte :("});
            }
           }else{
            res.render("admin/connexion",{error : "active", texte : `${nom} n'existe pas :(`});
        }
        }
    })
})

routeAdmin.get("/admin", (req, res) => {
    //
    if (req.session?.admin){
        let admin = req.session.admin;
        $.getTables((tables,bool) =>{
            if(bool){
                res.render("admin/admin",{tables,admin});
            }
        },"users","articles","contacte","commande","services");
    }else{
        res.redirect("/admin-connexion")
    }
    
})

routeAdmin.get("/admin-connexion",(req,res) =>{
    res.render("admin/connexion",{error : "none", texte : ""});
})

routeAdmin.delete("/delete/:table/:id",(req,res) =>{
    let {table,id} = req.params;
    let sql = `DELETE FROM ${table} WHERE id = ?`;
    pool.query(sql,id,(err) =>{
        if(err){
            res.send("non suprimer");
        }else{
            res.send("supprimer");
        }
    })
})

module.exports = routeAdmin;