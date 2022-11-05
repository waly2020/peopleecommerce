const express = require("express");
const pool = require("../scripts/pool");
const routeAdmin = express.Router();
const multer = require("multer");
const path = require("path");
const $ = require("../scripts/fonctions");

const storage = multer.diskStorage({
    destination : path.join('public','images','upload'),
    filename : (req,file,callback) =>{
        callback(null,`${file.fieldname}-${Date.now()}${file.originalname}`);
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
                console.log(req.body);
                let sql = `INSERT INTO articles (nom,prix,categorie,image) VALUES (?,?,?,?)`;
                pool.query(sql,[req.body.nom,req.body.prix,req.body.categorie,req.file.filename],(err)=>{
                    if(err){
                        console.log(err);
                        res.render("admin/error",{error : "N'as pas pue ajouter l'article veuileez ressayrer :("});
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

routeAdmin.get("/admin", (req, res) => {
    // 
    $.getTables((tables,bool) =>{
        if(bool){
            res.render("admin/admin",{tables});
        }
    },"users","articles");
})

routeAdmin.delete("/delete/:table/:id",(req,res) =>{
    let {table,id} = req.params;
    let sql = `DELETE FROM ${table} WHERE id = ?`;
    pool.query(sql,id,(err) =>{
        if(err){
            console.log("non suprimer");
        }else{
            res.send("supprimer");
        }
    })
})

module.exports = routeAdmin;