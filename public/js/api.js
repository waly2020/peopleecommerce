// https://marche-mont-bouet.onrender.com/
// https://marche-mont-bouet.onrender.com/
function getData(callback) {
    fetch("https://marche-mont-bouet.onrender.com/api/get-abonnes").then(res => {
        res.json().then(data => {
            callback(data);
        });
    });
}
function putArticles() {
    fetch(`https://marche-mont-bouet.onrender.com/api-add-to-panier/${JSON.stringify(panierStorage.filter(item => item !== null))}/${userId}`);
}

export { getData, putArticles };