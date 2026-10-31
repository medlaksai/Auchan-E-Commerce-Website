import { products } from "./api.js"

export function showProducts() {
    products()
        .then(product => {
            const container = document.getElementById("product-container")
            product.map(element => {
                let card = document.createElement("div");
                card.innerHTML = `<img src="${element.image}"> 
    <span>${element.categorie}</span>
    <p class="font-thin">${element.nom}</p>
    <span class="font-bold">${element.prix_mad} DH</span>
    `
                card.classList.add("product-card","p-3" ,"bg-white" , 'border' , 'border-stone-300' , 'rounded-xl', 'shadow' );
                container.append(card)
            })
        })

}
showProducts();