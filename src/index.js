const http = require('http')
const {env, portNumber} = require('./config/vars')
const {environment} = require('./constants')
const  app  = require('./Server.js')

const port = Number(portNumber)
const server = (env === environment.PRODUCTION) ? http.createServer(app) : app

server.listen(port, () => console.log(`Server started on port ${port} . . .`))
