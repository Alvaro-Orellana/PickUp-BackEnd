const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const { notFound, handler } = require('./middlewares')
const { env } = require('./config/vars')
const routes  = require('./routes')
const { environment } = require('./constants')



const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

(env === environment.PRODUCTION) ? app.use(helmet()) : app.use(morgan('short'));

//Routes
app.use('/v1', routes)

// Middlewares
console.log(notFound);
app.use(notFound)
app.use(handler)


module.exports = app