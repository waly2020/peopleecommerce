// 
// https://marche-mont-bouet.onrender.com/
function getData(callback) {
    fetch(host + "api/get-abonnes").then(res => {
        res.json().then(data => {
            callback(data);
        });
    });
}
function putArticles() {
    fetch(`${host}api-add-to-panier/${JSON.stringify(panierStorage.filter(item => item !== null))}/${userId}`);
}

export { getData, putArticles };