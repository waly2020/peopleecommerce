function getData (callback){
    fetch("https://marche-mont-bouet.onrender.com/api/get-abonnes").then(res => {
    res.json().then(data => {
        callback(data);
    });
});
}

export {getData};