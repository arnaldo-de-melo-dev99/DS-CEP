export default function RequestExceptionError(message) {
    const error = new Error(message)
    return error
}

RequestExceptionError.prototype = Object.create(Error.prototype)
