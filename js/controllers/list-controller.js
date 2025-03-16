function State() {
    this.listSection = null
}

const state = new State()

export function init() {
    state.listSection = document.querySelector("#list-section")
}

export function addCard(address) {
    const card = createCard(address)
    state.listSection.appendChild(card)
}

function createCard(address) {

    const card = document.createElement("div")
    card.classList.add("card-list-item")

    const city = document.createElement("h2")
    city.innerHTML = address.city

    const street = document.createElement("p")
    street.classList.add("adress-line")
    street.innerHTML = `${address.street}, ${address.number}`

    const cep = document.createElement("p")
    cep.classList.add("adress-cep")
    cep.innerHTML = address.cep

    card.appendChild(city)
    card.appendChild(street)
    card.appendChild(cep)

    return card
}
