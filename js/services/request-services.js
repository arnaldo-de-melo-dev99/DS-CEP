import RequestExceptionError from "./exceptions/request-exceptions.js"

export async function getJsonResponse(url) {

    try {
        const response = await fetch(url)
        const jsonBody = await response.json()
    
        return jsonBody
    } catch(e) {
        throw new RequestExceptionError("Invalid request")
    }

}