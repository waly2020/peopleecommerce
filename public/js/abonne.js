import * as $ from './api.js';

$.getData(data =>{
    document.querySelectorAll(".nbr-abonnee").forEach(abone =>{
        abone.textContent = data.length;
    })
})