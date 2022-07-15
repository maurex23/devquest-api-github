import { baseUrl } from "../variables.js"

async function setFollowers(name) {
    const response = await fetch(`${baseUrl}/${name}/followers`)
    const array = await response.json()
    const data = document.querySelector('.followers')
    let followerUser = ''
    if (array.length < 5) {
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
    data.innerHTML += `
        ${followerUser}
    `
}

async function setFollowing(name) {
    const response = await fetch(`${baseUrl}/${name}/following`)
    const array = await response.json()
    const data = document.querySelector('.following')
    let followingUser = ''
    if (array.length < 5) {
        for (let i = 0; i < array.length; i++) {
            followingUser += `
                    <div class='followingUser hidden'>
                        <p class='followerImg'> <img src='${array[i].avatar_url}' alt='foto do usuario seguido'  > </p>
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
    data.innerHTML += `
        ${followingUser}
    `
}


export {setFollowers, setFollowing}