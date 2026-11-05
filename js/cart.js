import {myData} from "./products.js"
import { getData , saveData } from "./storage.js";

const cartBtn = document.getElementById("cart-btn");
const  cartPanel = document.getElementById("cart-area");
const  cartOverlay = document.getElementById("show-cart");
const cartClose  = document.getElementById("close-cart");

export function toggleCart(open){
    cartPanel.classList.toggle("open" , open);
    cartOverlay.classList.toggle("open" , open);
}
document.addEventListener("DOMContentLoaded" ,() => {
    toggleCart(false)
})
cartBtn.addEventListener("click", () => toggleCart(true));
cartClose.addEventListener("click", () => toggleCart(false));
cartOverlay.addEventListener("click", () => toggleCart(false));



document.addEventListener("click" , function(e) {
    if (e.target.classList.contains("add-to-cart")){
        let id = Number(e.target.dataset.id);
        addToCart(id);
    }
});
updateCart();
export function addToCart(id){
    let cart = getData("cart") || [];
    let item = myData.find(element => element.id === id );
    if (!item) return;

    let existingItem = cart.find(element => element.id === id);
    if (existingItem){
        existingItem.quantity++;
    }else {
        cart.push({...item, quantity : 1})
    }
    saveData("cart" , cart)
    updateCart();
}
export function updateCart(){
    const cartContainer = document.getElementById("productsInCart");
    const totalPrice =document.getElementById("showingPrice");
    let cart = getData("cart") || [];
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
        let cart = getData("cart") || [];
        cart = cart.filter(item => item.id !== id);
        saveData("cart" , cart)
        updateCart();
    }
})

updateCart();