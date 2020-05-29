const { VALIDATION_ERROR, EXPIRATION_ERROR, MALFORMED_TOKEN } = require('../messages/services')
const { env } = require( '../config/vars')
const { environment } = require( '../constants')

const response = (status, code, message, data, errors, stackTrace) => {
    return (env === environment.PRODUCTION) ?
        { status, code, message, data, errors, } :
        { status, code, message, data, errors, stackTrace }
}

const verifyClaims = (payload) => {
    const nbf = new Date(payload.nbf * 1000)
    const exp = new Date(payload.exp * 1000)

    if (new Date() > exp) {
        throw { err: new Error(EXPIRATION_ERROR), msg: EXPIRATION_ERROR }
    }

    if (nbf > new Date()) {
        throw { err: new Error(VALIDATION_ERROR), msg: VALIDATION_ERROR }
    }
}

const decodeJwt = (jwt) => {
    const jwtParts = jwt.split('.')

    if (!jwt.includes('.')) {
        throw { err: new Error(MALFORMED_TOKEN), msg: MALFORMED_TOKEN }
    }
    if (jwtParts.length !== 3) {
        throw { err: new Error(MALFORMED_TOKEN), msg: MALFORMED_TOKEN }
    }
    try {
        const payload = JSON.parse(Buffer.from(jwtParts[1], 'base64').toString())
        verifyClaims(payload)
        return payload

    } catch (err) {
        throw { err: new Error(VALIDATION_ERROR), msg: VALIDATION_ERROR }
    }

}

const validateEmail = (value) => {

    return /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(value)
    
}

const validateUser = (usuario) => {

    return validarEmail(usuario.email) &&
        (usuario.nombre.length > 0) &&
        (usuario.apellido.length > 0) &&
        (usuario.password.length > 4) &&
        (usuario.password == usuario.confirmpw)

}


module.exports = {
    decodeJwt,
    response,
    validateUser
}