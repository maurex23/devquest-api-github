const btn = document.getElementById('btn-search')
const input = document.querySelector('#input-search')

import { getRepos } from './services/repositories.js'
import { getUser } from './services/user.js'

import { user } from './objects/user.js'
import { screen } from './objects/screen.js'

import { setFollowers, setFollowing } from './services/social.js'
import { getEvents, getRepoLink } from './services/events.js'

import { Events } from './objects/events.js'

input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        runUser()
    }
})

btn.addEventListener('click', () => {
    runUser()
})

function selectUser() {
    async function getUserData() {
        const name = input.value
        const userResponse = await getUser(name)
        const repositoriesResponse = await getRepos(name)
        user.setInfo(userResponse)
        user.setRepositories(repositoriesResponse)

        screen.renderUser(user)
    }
    getUserData()
}

function checkInput() {
    if (input.value == 0) {
        alert('Porfavor Preencha o campo com nome do Usuário do GitHub')
    } else {
        selectUser()
    }
}

async function checkUser() {
    const name = input.value
    const userResponse = await getUser(name)
    if (userResponse.message !== 'Not Found') {
        checkInput()
    } else {
        screen.renderNotFound()
    }
}

function runUser() {
    checkUser()
    setTimeout(() => {
        const followers = document.querySelector('.followersSocial')
        setFollowers(input.value)
        followers.addEventListener('click', () => {
            document.querySelectorAll('.follower').forEach(index => {
                index.classList.toggle('hidden')
            })

        })
        const following = document.querySelector('.followingSocial')
        setFollowing(input.value)
        following.addEventListener('click', () => {
            document.querySelectorAll('.followingUser').forEach(index => {
                index.classList.toggle('hidden')
            })

        })
    }, 3000)

    setEvent()
}

async function setEvent() {
    const eventObject = await getEvents(input.value)
    let eventWanted = eventObject.filter(event => {
        return event.type === 'PushEvent' || event.type === 'CreateEvent'
    })
    eventWanted = eventWanted.slice(0, 10)
    repoStats(eventWanted)
    console.log(eventWanted)
    if (eventWanted.length === 0) {
        screen.renderNoEvents()
    } else {
        let index = 0
        let intervId = 0
        intervId = setInterval(() => {
            if(index < 10) {
                index++
                console.log(Events.names)
                if (Events.links.length > 0) {
                    screen.renderEvents(eventWanted, Events.links, Events.names, Events.messages)
                    clearInterval(intervId)
                }
            } else {
                clearInterval(intervId)
            }
        }, 500)
    }

    

    // setTimeout(() => {
    //     screen.renderEvents(eventWanted, Events.links, Events.names, Events.messages)
    //     console.log(Events.links)
    //     console.log(Events.names)
    //     console.log(Events.messages)
    // }, 6000)

}

async function repoStats(events) {
    events.forEach(async event => {
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
    })
}



