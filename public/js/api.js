function getData (callback){
    fetch("https://marche-mont-bouet.onrender.com/api/get-abonnes").then(res => {
    res.json().then(data => {
        callback(data);
    });
});
}

function putArticles(){

//    const url = ;

    fetch(`https://marche-mont-bouet.onrender.com/api-add-to-panier/${JSON.stringify(panierStorage)}/${userId}`).then(res => {
        if(res.ok){
            console.log("Panier storage nevoye");
            console.log(res);
            // window.location.href = `/action/${redirect}`;
            // document.onload();
        }else{
            console.log("Panier storage non envoye");
            console.log(res);
        }
    })
}

export {getData,putArticles};