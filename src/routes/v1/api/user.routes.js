const { Router } = require( 'express')
const controller = require( '../../../controllers/user.controller')
const { authorization } = require('../../../middlewares/auth.middleware')

const router = Router()

router.route('/')
    .get(authorization, controller.getUserByEmail)

router.route('/initial')
    .put(authorization, controller.saveInitialData)

module.exports = router 