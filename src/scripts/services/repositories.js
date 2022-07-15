import { baseUrl, repositoriesQuantity } from "../variables.js"

async function getRepos(name) {
    const response = await fetch(`${baseUrl}/${name}/repos?per_page=${repositoriesQuantity}`)
    return await response.json()
}

export {getRepos}