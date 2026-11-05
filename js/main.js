import { activeFilter } from "./products.js"; 
import { toggleCart } from "./cart.js"
import {updateCart } from "./cart.js"
import { productss , showProducts } from "./products.js";
import "./validation.js"
productss().then(data => {
    showProducts(data);
});
activeFilter();
toggleCart(); 
updateCart();