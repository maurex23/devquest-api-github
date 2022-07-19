const user = {
    avatarUrl: '',
    name: '',
    followers: '',
    followersUrl: [],
    following: '',
    followingUrl: [],
    bio: '',
    userName: '',
    repositories: [],
    setInfo(gitHubUser) {
        this.avatarUrl = gitHubUser.avatar_url
        this.name = gitHubUser.name
        this.followers = gitHubUser.followers
        // this.followersUrl = 

        this.following = gitHubUser.following
        this.followingUrl = gitHubUser.following_url
        this.bio = gitHubUser.bio
        this.userName = gitHubUser.login
    },
    setRepositories(repositories) {
        this.repositories = repositories
    },
    setEvents(events) {
        this.events = events
    }
}

export { user }