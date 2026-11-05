import { activeFilter } from "./products.js"; 
import { toggleCart } from "./cart.js"
import {updateCart } from "./cart.js"
import { productss } from "./products.js";
productss().then(data => {
    showProducts(data);
});
activeFilter();
toggleCart(); 
updateCart();