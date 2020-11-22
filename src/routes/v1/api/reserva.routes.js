
const { Router } = require( 'express')
const controller = require( '../../../controllers/reserva.controller')
const { authorization } = require('../../../middlewares/auth.middleware')

const router = Router()

router.route('/:userId')
    .get(authorization, controller.getReservasByUser)

router.route('/')
.post(authorization, controller.generateReserva)

router.route('/accept')
.put(authorization, controller.accept)

router.route('/cancel')
.put(authorization, controller.cancel)

module.exports = router
