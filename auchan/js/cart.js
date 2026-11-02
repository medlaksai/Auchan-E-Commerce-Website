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
    