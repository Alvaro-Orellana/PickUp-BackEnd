const { Router } = require('express')
const user = require('./user.routes')
const reserva = require('./reserva.routes')
const weather = require('./weather.routes')

const router = Router()

router.use('/reserva', reserva)
router.use('/weather', weather)
router.use('/user', user);

module.exports = router
