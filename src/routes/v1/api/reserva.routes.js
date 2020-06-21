
const { Router } = require( 'express')
const controller = require( '../../../controllers/reserva.controller')
const { authorization } = require('../../../middlewares/auth.middleware')

const router = Router()

router.route('/:userId')
    .get(authorization, controller.getReservasByUser)

module.exports = router