import { baseUrl } from "../variables.js"

async function setFollowers(name) {
    const response = await fetch(`${baseUrl}/${name}/followers`)
    const array = await response.json()
    let followerUser = ''
    if (array.length === 0) {
        followerUser = "<div class='follower hidden'><h2>Este usuário não possui seguidores</h2></div>"
    } else if (array.length < 5) {
        for (let i = 0; i < array.length; i++) {
            followerUser += `
                    <div class='follower hidden'>
                        <p class='followerImg'> <img src='${array[i].avatar_url}' alt='foto do seguidor'  > </p>
                        <p>${array[i].login}</p>
                    </div>
                `
        }
        
    } else {
        for (let i = 0; i < 5; i++) {
            followerUser += `
                <div class='follower hidden'>
                    <p class='followerImg'> <img src='${array[i].avatar_url}' alt='foto do seguidor'> </p>
                    <p>${array[i].login}</p>
                </div>
            `
        }
        
    }

    let intervID = setInterval(() => {
        const data = document.querySelector('.followers')
        if (data !== null ) {
            data.innerHTML += `
            ${followerUser}
        `
        clearInterval(intervID)
        }
    }, 200) 
}

async function setFollowing(name) {
    const response = await fetch(`${baseUrl}/${name}/following`)
    const array = await response.json()
    let followingUser = ''
    if (array.length === 0) {
        followingUser += "<div class='followingUser hidden'><p>Este usuário não segue ninguém</p></div>"
    } else if (array.length < 5) {
        for (let i = 0; i < array.length; i++) {
            followingUser += `
                    <div class='followingUser hidden'>
                        <p class='followerImg'> <img src='${array[i].avatar_url}' alt='foto do usuario seguido'> </p>
                        <p>${array[i].login}</p>
                    </div>
                `
        }
    } else {
        for (let i = 0; i < 5; i++) {
            followingUser += `
                <div class='followingUser hidden'>
                    <p class='followerImg'> <img src='${array[i].avatar_url}' alt='foto do usuario seguido'> </p>
                    <p>${array[i].login}</p>
                </div>
            `
        }
    }

    let intervID = setInterval(() => {
        const data = document.querySelector('.following')
        if (data !== null ) {
            data.innerHTML += `
            ${followingUser}
        `
        clearInterval(intervID)
        }
    }, 200) 
}

export { setFollowers, setFollowing }