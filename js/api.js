export function products () {
    return fetch ("./data/data.json").then(response => response.json())
}