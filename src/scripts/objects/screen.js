const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `
        <div class='info'>
        <img class='avatar' src='${user.avatarUrl}' alt="Foto do Usuário" />
        <div class='data'>
            <h1> ${user.name ?? 'Não possui nome cadastrado 🥲'}</h1>
            <h2 class='social followersSocial'> Seguidores: ${user.followers}</h2>
            <div class='followers'> </div>
            <h2 class='social followingSocial'> Seguindo: ${user.following} </h2>
            <div class='following'></div>
            <p> ${user.bio ?? 'Não possui bio cadastrada 🥲'} </p>
        </div>
        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href='${repo.html_url}' target="_blank">${repo.name}</a></li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `
            <div class='repositories section'>
                <h2>Repositórios</h2>
                <ul>${repositoriesItens}</ul>
            </div>
            `
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = `
            <h3> Usuário não encontrado </h3>
        `
    }

}

export { screen }