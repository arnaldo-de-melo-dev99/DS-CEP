
function State() {
    this.container = null;
    this.btnClose = null;
}

const state = new State()

export function init() {
    state.container = document.querySelector("#modal-conatct")
    state.btnClose = document.querySelector("#modal-content-close")

    state.btnClose.addEventListener("click", handleBtnCloseClick)
    state.container.addEventListener("click",handleContainerClick)
}

export function closeModal() {
    state.container.classList.remove("active")
}

export function showModal() {
    state.container.classList.add("active")
}

function handleBtnCloseClick(event) {
    event.preventDefault()
    closeModal()
}

function handleContainerClick(event) {
    if (event.target === this) {
        closeModal()
    }
}