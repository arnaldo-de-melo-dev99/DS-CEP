import Address from "../models/address.js"
import * as listController from "./list-controller.js"
import * as addressServices from "../services/address-services.js"

function State() {

    this.address = new Address()

    this.inputCep = null
    this.inputStreet = null
    this.inputNumber = null
    this.inputCity = null

    this.btnModal = null
    this.btnSave = null
    this.btnClear = null

    this.modalContact = null

    this.errorCep = null
    this.errorNumber = null
    
}

const state = new State()

export function init() {
    state.inputCep = document.forms.newAdress.cep
    state.inputStreet = document.forms.newAdress.street
    state.inputNumber = document.forms.newAdress.number
    state.inputCity = document.forms.newAdress.city

    state.btnSave = document.forms.newAdress.btnSave
    state.btnClear = document.forms.newAdress.btnClear

    // state.errorCep = document.querySelector('[data-error="cep"]')
    // state.errorNumber = document.querySelector('[data-error="number"]')

    const changeInput = new InputVoid()

    state.inputNumber.addEventListener("change", changeInput.handleInputNumberChange)
    // state.inputNumber.addEventListener("keyup", changeInput.handleInputNumberKeyup)

    state.inputCep.addEventListener("change", changeInput.handleInputCepChange)

    // state.inputNumber.addEventListener("input", changeInput.handleInputNumberChange)

    // state.inputCep.addEventListener("input", changeInput.handleInputCepChange)

    state.btnClear.addEventListener("click", handleBtnClick)
    state.btnSave.addEventListener("click", handleBtnSaveClick)

    console.log(state)
}

init()

function handleBtnSaveClick(event) {

    event.preventDefault()
    const errors = addressServices.getErrors(state.address)

    const keys = Object.keys(errors)

    if (keys.length > 0) {

        keys.forEach(key => {
            setFormError(key, errors[key])
        })


    } else {
        listController.addCard(state.address)
        clearForm()
    }
}

function handleBtnClick(event) {
    event.preventDefault();
    clearForm()
}

function InputVoid() {

    this.handleInputNumberChange = async (event) => {
        const cep = event.target.value
        if (cep == "") {
            setFormError("number", "Campo requerido")
        } else {
            setFormError("number", "")
        }
    }

    this.handleInputCepChange = async (event) => {
        const cep = event.target.value
        if (cep == "") {
            setFormError("cep", "Campo requerido")
        } else {
            setFormError("cep", "")

            try {
                const address = await addressServices.findByCep(cep)
                state.inputNumber.focus()
                state.inputCity.value = address.city
                state.address = address
            } catch (e) {
                state.inputStreet.value = ""
                state.inputCity.value = ""
                setFormError("cep", "Informe um CEP valido")
            }
        }
    }

    this.handleInputNumberKeyup = (event) => {
        const number = event.target.value
        if (number >= 100) {
            state.address.number = number
        }
    }

}

function clearForm() {

    state.inputCep.value = ""
    state.inputNumber.value = ""
    state.inputStreet.value = ""
    state.inputCity.value = ""

    setFormError("number", "")
    setFormError("cep", "")

    state.address = new Address()

    state.inputCep.focus()

}

function setFormError(key, value) {
    const element = document.querySelector(`[data-error="${key}"]`)
    element.innerHTML = value
}

function animateInput() {
    state.inputCep.addEventListener("click", () => {
        document.querySelectorAll("label")[0].style.width = "100%"
    })

    state.inputCep.addEventListener("blur", () => {
        document.querySelectorAll("label")[0].style.width = "10%"
    })

    state.inputNumber.addEventListener("click", () => {
        document.querySelectorAll("label")[2].style.width = "100%"
    })

    state.inputNumber.addEventListener("blur", () => {
        document.querySelectorAll("label")[2].style.width = "10%"
    })
}

export { animateInput }