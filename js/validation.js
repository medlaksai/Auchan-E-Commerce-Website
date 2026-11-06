import { fetchRandomUser } from "./api.js";

export const fields = {
    name : /^[A-Za-z][A-Za-z\s'-]{1,49}$/ ,
    email : /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 
    phone : /^\+?[\d\s().-]{10,15}$/,
    message : /^[\s\S]{10,500}$/ 
 }

 const messages = {
    name : "Nom Invalide",
    email : "Email Invalide",
    phone : "Telephone Invalide",
    message : "Message Invalide(10 a 500 caracteres)"
 }
export function validateField(field , value){
    let text = value.trim();
    if(field == "phone") text = text.replace(/[\s().-]/g, "");
    return fields[field].test(text) ? "" : messages[field];
}
 export function userToInput(user){
    return {
        name : `${user.name.first} ${user.name.last}`,
        email : user.email ,
        phone : user.cell ,
        message : "Bonjour , message Ici "
    }
 }
 const form = document.getElementById("contactForm");

 if(form) {
    const inputs = {
        name : document.getElementById("contact-name"),
        email : document.getElementById("contact-email"),
        phone : document.getElementById("contact-phone"),
        message : document.getElementById("contact-message")
    };
const result = document.createElement("p");
form.append(result);

form.addEventListener("submit" , e => {
    e.preventDefault();
    const errors = Object.keys(inputs)
    .map(key => validateField(key , inputs[key].value))
    .filter(error => error !== "");
    result.textContent = errors.length ? errors.join(" | ") : "Message Envoye !"
    if(errors.length === 0) form.reset();
})


document.getElementById("generateTestData").addEventListener("click" ,()=> {
    fetchRandomUser()
    .then(user => {
        const values = userToInput(user);
        Object.keys(inputs).forEach(key => {
            inputs[key].value = values[key];
        });
    });
})
 }