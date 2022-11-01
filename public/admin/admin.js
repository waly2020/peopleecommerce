// variables
let active_aside = document.querySelector(".can-active-aside");
let aside = document.querySelector(".barre");
let active_page = document.querySelectorAll(".item");
let pages = document.querySelectorAll(".page");
let forms = document.querySelectorAll(".forms");
let active_form = document.querySelector(".add-items");

let key_forms = 0;

// activation sidebar et formulaire
active_aside.addEventListener("click", () => {
    aside.classList.toggle("active");
    active_aside.classList.toggle("active");
});

// affichage de la pasge
active_page.forEach((btn, key, array) => {
    btn.addEventListener("click", () => {
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            page.classList.remove("active");
            active_page[i].classList.remove("active");
        }
        pages[key].classList.add("active");
        btn.classList.add("active");
        aside.classList.remove("active");
        active_aside.classList.remove("active");
        key_forms = parseFloat(btn.getAttribute("data-form"));
    })
});

// activation du forlmulaire
active_form.addEventListener("click", () => {
    if (key_forms) {
        forms[key_forms - 1].classList.toggle("active");
    }
});

function suprimer(table,id){

    const url = `http://localhost:3001/delete/${table}/${id}`;

    fetch (url,{method : "DELETE"}).then(res => {
        if(res.ok){
            window.location.href = "/admin";
        }else{
            console.log("non sup");
        }
    })
}