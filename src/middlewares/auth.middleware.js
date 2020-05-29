const { UNAUTHORIZED, FORBIDDEN } = require('http-status')
const { jwtScopes, errorMessages } = require( '../constants')
const { error } = require( './error.middleware')
const { decodeJwt } = require( '../utils')



const authorization = (scope) => (req, res, next) => {
    try {
        const { headers: { authorization } } = req;
        if (!authorization) {
            return res.status(UNAUTHORIZED).json(error(errorMessages.NO_TOKEN_SPECIFIED, UNAUTHORIZED))
        }
        const { scopes } = decodeJwt(authorization)

        if (scopes.includes(scope) || scopes[0] === jwtScopes.ALL) {
            return next()
        }

        return res.status(FORBIDDEN).json(error(errorMessages.SCOPE_CHECK_FAILED, FORBIDDEN))

    } catch (errorRes) {
        const { err } = errorRes;
        return res.status(UNAUTHORIZED).json(error(errorRes.msg, UNAUTHORIZED, errorRes, err.stack))
    }
}

module.exports = { authorization }