const { OK } = require( 'http-status')
const { response } = require( '../utils')

const success = (data, status = OK, message = '') =>
  response('success', status, message, data, null)

module.exports = {success};