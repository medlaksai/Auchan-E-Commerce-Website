import { products } from "./api.js";
import { saveData } from "./storage.js";

const form = document.getElementById("product-form")
const tbody = document.getElementById("products-body")
const filterInputs = document.getElementById("filter")
const submitBtn = document.getElementById("submit-btn")

const nameInput = document.getElementById("p-name")
const categoryInput = document.getElementById("p-category")
const priceInput = document.getElementById("p-price")
const imageInput = document.getElementById("p-image")
const sizeInput = document.getElementById("p-size")

let allProducts = [];
let editingId = null ;

const saveProducts = () => saveData("products" , allProducts);
function renderTable(){
    const search = filterInputs.value.trim().toLowerCase();
    const list = allProducts.filter(p => p.nom.toLowerCase().includes(search));

    if (list.length === 0){
        tbody.innerHTML = `<tr><td>Aucun Produit</td></tr>`;
        return;
    }
    tbody.innerHTML = list.map(p => `
        <tr class="border-b text-center">
        <td> 
        <img src="${p.image}" class="w-16 h-16 object-cover mx-auto">
        </td>
        <td>${p.nom}</td>
        <td>${p.categorie}</td>
        <td>${p.prix_mad} DH</td>
        <td>
        <button data-id="${p.id}" data-action="edit">Modifie</button>
        <button data-id="${p.id}" data-action="delete">Supprimer</button>
        </td>
        </tr>
        `).join("")
}

filterInputs.addEventListener("input", renderTable);
products().then(data => {
    allProducts = data;
    renderTable();
});