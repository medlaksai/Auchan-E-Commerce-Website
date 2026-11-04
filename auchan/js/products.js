
import { products } from "./api.js";

let currentFilter = "";

const filterInput = document.querySelector("#filter");

let myData = JSON.parse(localStorage.getItem("data")) || [];

export function showProducts(data = myData) {
    const container = document.getElementById("product-container");

    container.innerHTML = "";

    data.forEach(element => {
        let card = document.createElement("div");

        card.innerHTML = `
            <img class="object-cover w-full h-50" src="${element.image}">
            <span>${element.categorie}</span>
            <p class="font-thin">${element.nom}</p>
            <span class="font-bold">${element.prix_mad} DH</span>
            <button class="bg-red-600 text-white p-2 rounded w-full mt-3">
                Ajouter au panier
            </button>
        `;

        card.classList.add("product-card", "p-3", "bg-white", "border", "border-stone-300", "rounded-xl", "shadow");

        container.append(card);
    });
}

filterInput.addEventListener("input", e => {
    currentFilter = e.target.value.toLowerCase();

    const filteredProducts = myData.filter(product =>
        product.nom.toLowerCase().includes(currentFilter)
    );

    showProducts(filteredProducts);
});

showProducts();
