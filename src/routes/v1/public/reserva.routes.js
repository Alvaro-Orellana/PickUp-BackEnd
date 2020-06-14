
const { Router } = require( 'express')
const controller = require( '../../../controllers/reserva.controller')

const router = Router()

router.post('/test', controller.test)

module.exports = router