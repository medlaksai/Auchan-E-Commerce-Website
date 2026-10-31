import { products } from "./api.js"
/*
export function showProducts() {
    products()
        .then(product => {
            const container = document.getElementById("product-container")
            product.map(element => {
                let card = document.createElement("div");
                card.innerHTML = `<img class="object-cover w-full h-50 " src="${element.image} "> 
    <span>${element.categorie}</span>
    <p class="font-thin">${element.nom}</p>
    <span class="font-bold">${element.prix_mad} DH</span>
    <button class="bg-red-600 text-white p-2 rounded w-full mt-3">Ajouter au panier</button>
    `
                card.classList.add("product-card","p-3" ,"bg-white" , 'border' , 'border-stone-300' , 'rounded-xl', 'shadow' );
                container.append(card)
            })
        })

}
showProducts();  
*/
const cartBtn = document.getElementById("cart-btn");
const  cartPanel = document.getElementById("cart-area");
const  cartOverlay = document.getElementById("show-cart");
const cartClose  = document.getElementById("close-cart");

function toggleCart(open){
    cartPanel.classList.toggle("open" , open);
    cartOverlay.classList.toggle("open" , open);
}
cartBtn.addEventListener("click", () => toggleCart(true));
cartClose.addEventListener("click", () => toggleCart(false));
cartOverlay.addEventListener("click", () => toggleCart(false));