function getData (callback){
    fetch("https://marche-mont-bouet.onrender.com/api/get-abonnes").then(res => {
    res.json().then(data => {
        callback(data);
    });
});
}

function putArticles(){
    fetch(`https://marche-mont-bouet.onrender.com/api-add-to-panier/${JSON.stringify(panierStorage)}/${userId}`);
}

export {getData,putArticles};