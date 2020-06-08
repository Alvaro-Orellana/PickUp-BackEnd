
const { Router } = require( 'express')
const controller = require( '../../../controllers/user.controller')

const router = Router()

router.post('/register', controller.register)
router.post('/login', controller.login)
router.post('/test', controller.loginTest)
module.exports = router
