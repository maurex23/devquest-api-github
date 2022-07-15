import { baseUrl } from "../variables.js"

async function getUser(name) {
    const response = await fetch(`${baseUrl}/${name}`)
    console.log(name)
    return await response.json()
}

export {getUser}