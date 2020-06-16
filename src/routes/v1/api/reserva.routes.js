
const { Router } = require( 'express')
const { jwtScopes } = require('../../../constants')
const controller = require( '../../../controllers/reserva.controller')
const { authorization } = require('../../../middlewares/auth.middleware')

const router = Router()

router.route('/:userId')
    .get(authorization(jwtScopes.RR), controller.getReservasByUser)

module.exports = router