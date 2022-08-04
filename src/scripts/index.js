const btn = document.getElementById('btn-search')
const input = document.querySelector('#input-search')

import { getRepos } from './services/repositories.js'
import { getUser } from './services/user.js'

import { user } from './objects/user.js'
import { screen } from './objects/screen.js'

import { setFollowers, setFollowing } from './services/social.js'
import { getEvents, getRepoLink } from './services/events.js'

import { Events } from './objects/events.js'

input.addEventListener('keypress', async (e) => {
    if (e.keyCode === 13) {
        await runUser()
    }
})


btn.addEventListener('click', async () => {
    await runUser()
})

async function runUser() {
    await checkUser()
    await setSocial()
    await setEvent().then(() => {
        clickButton()
    })

}

async function checkUser() {
    const name = input.value
    const userResponse = await getUser(name)
    if (userResponse.message !== 'Not Found') {
        await checkInput()
    } else {
        screen.renderNotFound()
    }
}

async function setSocial() {
    await setFollowers(input.value)
    await setFollowing(input.value)
}

function clickButton() {
    const followers = document.querySelector('.followersSocial')
    followers.addEventListener('click', () => {
        document.querySelectorAll('.follower').forEach(index => {
            index.classList.toggle('hidden')
        })
    })

    const following = document.querySelector('.followingSocial')
    following.addEventListener('click', () => {
        document.querySelectorAll('.followingUser').forEach(index => {
            index.classList.toggle('hidden')
        })
    })
}

async function setEvent() {
    const eventList = await getEvents(input.value)
    let eventWanted = eventList.filter(event => {
        return event.type === 'PushEvent' || event.type === 'CreateEvent'
    })
    eventWanted = eventWanted.slice(0, 10)
    await repoStats(eventWanted)

    screen.renderEvents(eventWanted, Events.links, Events.names, Events.messages)
}

async function checkInput() {
    if (input.value == 0) {
        alert('Porfavor Preencha o campo com nome do Usuário do GitHub')
    } else {
        await getUserData()
        // forks_count watchers_count stargazers_count language
    }
}


async function repoStats(events) {
    for (const event of events ) {
        const link = await getRepoLink(event)
        Events.links.push(link)
        const name = await event.repo.name
        Events.names.push(name)
        try {
            const message = await event.payload.commits[0].message
            Events.messages.push(message)
        } catch (e) {
            Events.messages.push('Este evento nao possui mensagem')
        }
    }
}

async function getUserData() {
    const name = input.value
    const userResponse = await getUser(name)
    const repositoriesResponse = await getRepos(name)
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)

    screen.renderUser(user)
}




