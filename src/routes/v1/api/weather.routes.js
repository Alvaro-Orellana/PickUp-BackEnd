const { Router } = require( 'express')
const controller = require( '../../../controllers/weather.controller')
const { authorization } = require('../../../middlewares/auth.middleware')

const router = Router()

router.route('/:lat/:lon')
    .get(authorization, controller.getWeatherByCords)

module.exports = router