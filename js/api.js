import {saveData} from "./storage.js"
export function products () {
    return fetch ("./data/data.json")
    .then(response => response.json())
    .then(data => {
        saveData("data" ,data)
        return data
    })
}

export function fetchRandomUser(){
    return fetch("https://randomuser.me/api/?nat=fr&inc=name,email,cell")
    .then(response => {
        if (!response.ok) throw new Error("Api Indisponible")
            return response.json();
    })
    .then(data => data.results[0]);
}