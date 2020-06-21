
const { environment } = require('../constants')
require('../LoadEnv')

const env = process.env.NODE_ENV || environment.DEVELOPMENT;
const OAuthApiKey = process.env.OAUTH_API_KEY
const portNumber = process.env.PORT || 8080
const databaseUrl = process.env.DATABASE_URL || ""
const USERS_COLLECTION = process.env.USERS_COLLECTION || ""
const RESERVAS_COLLECTION = process.env.RESERVAS_COLLECTION || ""
const API_KEY = process.env.API_KEY || ""
const defaultLimit = 10
const defaultOffset = 0


module.exports =  { env, OAuthApiKey, portNumber, USERS_COLLECTION, RESERVAS_COLLECTION, API_KEY, defaultLimit,defaultOffset }