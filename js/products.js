
import { products } from "./api.js";

let currentFilter = "";
let selectCategory = "Tout";
let currentPage = 1;
const productsPerPage = 4;

const filterInput = document.querySelector("#filter");

export let myData = JSON.parse(localStorage.getItem("data")) || [];

export function showProducts(data = myData) {
    const container = document.getElementById("product-container");

    container.innerHTML = "";

    data.forEach(element => {
        let card = document.createElement("div");

        card.innerHTML = `
            <img src="${element.image}" class="object-cover w-full h-50" >
            <span>${element.categorie}</span>
            <p class="font-thin">${element.nom}</p>
            <span class="font-bold">${element.prix_mad} DH</span>
            <button data-id="${element.id}"  class="add-to-cart bg-red-600 text-white p-2 rounded w-full mt-3">
                Ajouter au panier
            </button>
        `;

        card.classList.add("product-card", "p-3", "bg-white", "border", "border-stone-300", "rounded-xl", "shadow");
        card.draggable = "true";
        card.dataset.id = element.id;
        container.append(card);
    });

}


export function activeFilter(){
    myData = JSON.parse(localStorage.getItem("data")) || []
    const filtredProducts = myData.filter(product => 
        product.nom.toLowerCase().includes(currentFilter) &&
        (selectCategory === "Tout" || product.categorie === selectCategory)
    );
    const totalPages = Math.ceil(filtredProducts.length / productsPerPage) || 1;
    if (currentPage > totalPages ) currentPage = totalPages;
    const start = (currentPage - 1 ) * productsPerPage ;
    const pageProducts = filtredProducts.slice(start , start + productsPerPage);
    showProducts(pageProducts)
    renderPagination(totalPages)
    
}
function renderPagination(totalPages) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = "px-3 py-1 border rounded " +
            (i === currentPage ? "bg-red-600 text-white" : "bg-white");

        btn.addEventListener("click", () => {
            currentPage = i;
            activeFilter();
        });

        pagination.append(btn);
    }
}

filterInput.addEventListener("input", e => {
    currentFilter = e.target.value.toLowerCase() 
    currentPage = 1;
    activeFilter();
});

document.querySelectorAll(".categories button").forEach(btn => {
    btn.addEventListener("click" , () => {
        selectCategory = btn.dataset.category;
        currentPage = 1;
        activeFilter();
    });
});
activeFilter();
