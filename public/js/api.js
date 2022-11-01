function getData (callback){
    fetch("http://localhost:3001/api/get-abonnes").then(res => {
    res.json().then(data => {
        callback(data);
    });
});
}

export {getData};