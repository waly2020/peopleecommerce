// variables
let active_aside = document.querySelector(".can-active-aside");
let aside = document.querySelector(".barre");
let active_page = document.querySelectorAll(".item");
let pages = document.querySelectorAll(".page");
let forms = document.querySelectorAll(".forms");
let active_form = document.querySelector(".add-items");
let see_image = document.querySelectorAll(".see-images");
let article_users = document.querySelectorAll(".article-users");
// let host = "http://localhost:10000/";
//https://marche-mont-bouet-online.up.railway.app/
// https://marche-mont-bouet.onrender.com/
let host = "https://marche-mont-bouet-online.up.railway.app/";


let key_forms = 0;
let key_page = parseFloat(localStorage.getItem("page")) || 0;

pages[key_page].classList.add("active");
active_page[key_page].classList.add("active");

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
        // pour aside
        aside.classList.remove("active");
        active_aside.classList.remove("active");
        // fin aside
        key_forms = parseFloat(btn.getAttribute("data-form"));
        localStorage.setItem("page", `${key}`);
    })
});
// activation du forlmulaire
active_form.addEventListener("click", () => {
    if (key_forms) {
        forms[key_forms - 1].classList.toggle("active");
    }
});

function suprimer(table, id) {

    const url = `${host}delete/${table}/${id}`;
    console.log("lancement du fech");
    fetch(url, { method: "DELETE" }).then(res => {
        if (res.ok) {
            window.location.href = "/admin";
        } else {
            console.log("non sup");
        }
    })
}
see_image.forEach(btn => {
    btn.addEventListener("click", () => {
        for (let i = 0; i < article_users.length; i++) {
            let page = article_users[i];

            if (page.getAttribute("data-see") == btn.getAttribute("data-see")) {
                page.classList.toggle("active");
                break;
            }
        }
    })
})