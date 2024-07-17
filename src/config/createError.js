export const createError = (msg,status) => {
    const error = new Error(msg)
    error.status = status
    console.log(1234,error)
    return error
}