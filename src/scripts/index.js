const btn = document.getElementById('btn-search')
const input = document.querySelector('#input-search')

import { getRepos } from './services/repositories.js'
import { getUser } from './services/user.js'

import { user } from './objects/user.js'
import { screen } from './objects/screen.js'

import { setFollowers, setFollowing } from './services/social.js'

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
        console.log(followers)
        setFollowers(input.value)
        followers.addEventListener('click', () => {
            document.querySelectorAll('.follower').forEach(index => {
                index.classList.toggle('hidden')
            })

        })
        const following = document.querySelector('.followingSocial')
        console.log(following)
        setFollowing(input.value)
        following.addEventListener('click', () => {
            document.querySelectorAll('.followingUser').forEach(index => {
                index.classList.toggle('hidden')
            })

        })
    }, 3000)
}