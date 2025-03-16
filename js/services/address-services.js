import * as requestServices from "../services/request-services.js"
import Address from "../models/address.js"

async function findByCep(cep) {

    const url = `https://viacep.com.br/ws/${cep}/json/`
    const response = await requestServices.getJsonResponse(url)

    const address = new Address(response.cep, response.logradouro, null, response.localidade)
    return address
    
}

export function getErrors(address) {
    const errors = {}

    if (!address.cep || address.cep == "") {
        errors.cep = "Campo requerido"
    }

    if (!address.number || address.number == "") {
        errors.number = "Campo requerido"
    }

    return errors
}
