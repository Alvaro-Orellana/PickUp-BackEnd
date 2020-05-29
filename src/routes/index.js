const { Router } = require( 'express')
const apiRoutes = require( './v1/api')
const publicRoutes = require( './v1/public')

const router = Router()

//router.use('/', apiRoutes)
router.use('/public', publicRoutes)

module.exports = router
