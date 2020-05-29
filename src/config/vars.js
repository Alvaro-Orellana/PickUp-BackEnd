
const { environment } = require('../constants')
require('../LoadEnv')

const env = process.env.NODE_ENV || environment.DEVELOPMENT;
const OAuthApiKey = process.env.OAUTH_API_KEY
const portNumber = process.env.PORT || 8080

module.exports =  { env, OAuthApiKey, portNumber }