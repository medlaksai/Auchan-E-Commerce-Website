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

const patterns = {
    nom: /^[\p{L}\p{N}][\p{L}\p{N}\s'’.,&()-]{1,59}$/u,
    prix: /^\d+([.,]\d{1,2})?$/ ,
    image: /^(https?:\/\/\S+|[\w./-]+\.(png|jpe?g|webp|gif|svg))$/i
};

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
function validateForm(){
    const errors = [];
    if (!patterns.nom.test(nameInput.value.trim())) {
        errors.push("Nom Invalide")
    }
    if (!patterns.prix.test(priceInput.value.trim())) {
        errors.push("prix Invalide")
    }
    if (!patterns.image.test(imageInput.value.trim())) {
        errors.push("image Invalide")
    }
    if (!categoryInput.value) {
        errors.push("Category Invalide")
    }
    return errors;
}

function nextId(){
    const ids = allProducts.map(p => Number(p.id)).filter(Number.isFinite);
    return ids.length ? Math.max(...ids) + 1 : 1 ;
}
form.addEventListener("submit" , (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length > 0){
        alert(errors.join("\n"))
        return;
    }
    const newProduct = {
        id : nextId(),
        nom : nameInput.value.trim() ,
        categorie : categoryInput.value ,
        prix_mad : Number(priceInput.value.trim().replace("," , ".")),
        image : imageInput.value.trim()
    };
    allProducts.push(newProduct);
    saveProducts();
    renderTable();
    form.reset();
})



filterInputs.addEventListener("input", renderTable);
products().then(data => {
    allProducts = data;
    renderTable();
});