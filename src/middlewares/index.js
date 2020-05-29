const { error, handler } = require('./error.middleware')
const { authorization } = require('./auth.middleware')
const { notFound } = require('./notFound.middleware')
const { success } = require('./success.middleware')
const { oAuth } = require('./oAuth.middleware')

module.exports = {
    error,
    handler,
    authorization,
    notFound,
    success,
    oAuth
}