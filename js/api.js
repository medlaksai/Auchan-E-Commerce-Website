import {saveData} from "./storage.js"
export function products () {
    return fetch ("./data/data.json")
    .then(response => response.json())
    .then(data => {
        saveData("data" ,data)
        return data
    })
}