import { addToCart } from "./cart.js";

const productContainer = document.getElementById("product-container");
const cartArea = document.getElementById("cart-area");

productContainer.addEventListener("dragstart" , e => {
    const card = e.target.closest(".product-card");
    if (!card)
        return;
    e.dataTransfer.setData("productId" , card.dataset.id);
})

cartArea.addEventListener("dragover" , e => {
    e.preventDefault();
})

cartArea.addEventListener("drop" , e => {
    e.preventDefault();

    const id = Number(e.dataTransfer.getData("productId"));
    if(!id) return;
    addToCart(id);
})