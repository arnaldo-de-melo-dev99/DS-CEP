import * as modalController from "./modal-controller.js"

export function init() {
    const btnModalActiv = document.querySelector("#modalActive")

    btnModalActiv.addEventListener("click",  handleContactLinkClick)
}

function handleContactLinkClick() {
    modalController.showModal()
}