const { Router } = require('express')
const user = require('./user.routes')
const reserva = require('./reserva.routes')

const router = Router()

router.use('/reserva', reserva)

module.exports = router
