const btn = document.getElementById('btn-search')
const input = document.querySelector('#input-search')



import { getRepos } from './services/repositories.js'
import { getUser } from './services/user.js'

import { user } from './objects/user.js'
import { screen } from './objects/screen.js'

input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        checkUser()
    }
})

btn.addEventListener('click', () => {
    checkUser()
})

function selectUser() {
    async function getUserData() {
        const name = input.value
        const userResponse = await getUser(name)
        const repositoriesResponse = await getRepos(name)
        console.log(userResponse)
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