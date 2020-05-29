const { INTERNAL_SERVER_ERROR } = require( 'http-status')
const { response } = require( '../utils')

const error = (msg, code, errors, stackTrace) =>
  response('error', code, msg, null, errors, stackTrace)


const handler = async (err, req, res, next) =>
  res.status(INTERNAL_SERVER_ERROR)
    .json(response('error', INTERNAL_SERVER_ERROR, err.message, null, err, err.stack))

module.exports = {
    error,
    handler
}