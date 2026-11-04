export function products () {
    return fetch ("./data/data.json")
    .then(response => response.json())
    .then(data => {localStorage.setItem("data", JSON.stringify(data))
        return data
    })
}