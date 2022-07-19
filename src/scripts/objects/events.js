const Events = {
    links: [],
    names: [],
    messages: [],
    
}

document.querySelector('#input-search').addEventListener('click', () => {
    Events.links = []
    Events.names = []
    Events.messages = []
})

export {Events}