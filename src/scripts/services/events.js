import { baseUrl } from "../variables.js"

async function getEvents(user) {
    const link = await fetch(`${baseUrl}/${user}/events`)
    return await link.json()
}

async function getRepoLink(event) {
    const link = await fetch(`${event.repo.url}`)
    return await link.json()
    
}

export {getEvents, getRepoLink}