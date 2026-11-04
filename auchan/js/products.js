
import { products } from "./api.js";

let currentFilter = "";
let selectCategory = "Tout";
let currentPage = 1;
const productsPerPage = 8;

const filterInput = document.querySelector("#filter");

let myData = JSON.parse(localStorage.getItem("data")) || [];

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
        
        container.append(card);
    });

}
document.addEventListener("click" , function(e) {
    if (e.target.classList.contains("add-to-cart")){
        let id = Number(e.target.dataset.id);
        addToCart(id);
    }
})
export function addToCart(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = myData.find(element => element.id === id );
    if (!item) return;

    let existingItem = cart.find(element => element.id === id);
    if (existingItem){
        existingItem.quantity++;
    }else {
        cart.push({...item, quantity : 1})
    }
    localStorage.setItem("cart" , JSON.stringify(cart));
    updateCart();
}
export function updateCart(){
    const cartContainer = document.getElementById("productsInCart");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";
   
    let total = 0;
    cart.forEach(item => {
        total += item.prix_mad * item.quantity
        const div = document.createElement("div");
        div.className = "flex items-center justify-between gap-3 border-b p-3";
        div.innerHTML =`
        <div class=" w-full">
        <image class="w-25 h-25"src="${item.image}">
        <h3 class="font-bold">${item.nom}</h3> 
        <p>${item.prix_mad} DH</p>
        <p>${item.quantity}</p>
        <button data-id="${item.id}" class="delete-Btn bg-black text-white p-1 rounded-l">retirer</button>
        </div>
        `
        cartContainer.append(div);
    });
    cartContainer.addEventListener("click" , function(e) {
        if(e.target.classList.contains("delete-Btn")){
            e.target.closest(".cart.item").remove();
        }
    })
    cartContainer.innerHTML += `
    <div  class="flex justify-between font-bold p-3">
    <span>Total : </span>
    <span>${total} DH</span>
    </div>
    `;
}
document.getElementById("productsInCart").addEventListener("click", function(e){
    if(e.target.classList.contains("delete-Btn")){
        const id = Number(e.target.dataset.id);
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem("cart" , JSON.stringify(cart));
        updateCart();
    }
})

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
updateCart();
activeFilter();
products()