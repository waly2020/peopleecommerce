function getData (callback){
    fetch("https://marche-mont-bouet.onrender.com/api/get-articlesapi/get-abonnes").then(res => {
    res.json().then(data => {
        callback(data);
    });
});
}
function putArticles(){
    fetch(`https://marche-mont-bouet.onrender.com/api/get-articlesapi-add-to-panier/${JSON.stringify(panierStorage.filter(item => item !== null))}/${userId}`);
}

export {getData,putArticles};