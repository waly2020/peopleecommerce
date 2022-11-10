const express = require("express");
const routChatBot = express.Router();
const qrcode = require('qrcode-terminal');
const contact = '24104937621@c.us';
const localStorage = require("./storage");
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

const startChatBot = client.initialize();

client.on('ready', () => { 
    console.log('Client is ready!');
});

routChatBot.post("/api/commande/:commande/:user",(req,res) =>{

    let commande = req.params.commande;
    let user = JSON.parse(req.params.user);
    let body = req.body;
    let articles = JSON.parse(localStorage.getItem(`articles-${user.id}`));

    console.log("chatbot en cour d'execution");

    startChatBot.then(() =>{
        client.sendMessage(contact,`Salut...\nJe m'appel ${user.name}. Je voudrais une ${commande} de c'est articles`).then(() =>{

            switch (commande) {
                case "livraison":
                    client.sendMessage(contact,`Details de livraison...\nMon numero : ${body.numero}\nDate de livraison : ${body.date}\nLieux de livraison : ${body.ville}`);
                    break;
                case "reservation" :
                    client.sendMessage(contact,`Details de la resercation...\nMon numero : ${body.numero}\nDate de recuperation : ${body.date}`);
                    break;
            }

        }).then(() =>{
            for (let i = 0; i < articles.length; i++){
                let article = articles[i];
                if(article){
                    client.sendMessage(contact,MessageMedia.fromFilePath(`./public/images/upload/${article.image}`),{caption : `Nom de l'article : ${article.titre}\nPrix de l'article : ${article.prix}\nQuantiter : ${article.quantiter}`});
                }
            }
        }).then(() =>{
            let quantiter = 0;
            let total = 0;
            for (let i = 0; i < articles.length; i++){
                let a = articles[i];
                if(a){
                  quantiter += a.quantiter;
                  total += a.prix * a.quantiter;
                }
            }
            client.sendMessage(contact,`Nombrex total d'article : ${quantiter}\nPrix total : ${total}`);
        }).then(() =>{
            res.redirect("/status");
        })
    }).catch(err =>{
        res.send("Verifier votre connexion et ressayer " + err);
    })
})

 module.exports = routChatBot;