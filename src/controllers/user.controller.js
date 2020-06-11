const { OK } = require('http-status')
const { success } = require('../middlewares/success.middleware')
const { validateUser } = require('../utils')
const { error } = require('../middlewares/error.middleware')
const { login2 } = require('../queries/auth.query')
const { register2 } = require('../queries/auth.query')
const { mostrar } = require('../queries/auth.query')


const register = async (req, res) => {
    //(validateUser(req.body))? res.status(OK).json(success((req.body))):res.status(500).json(error('No se puede registrar',500))
    const user = req.body
    if (validateUser(user)) {
        await register2(user)
        res.status(OK).json(success(user))
    } else {
        res.status(500).json(error('No se puede registrar', 500))
    }


}

const login = async (req, res) => {
    res.status(OK).json(success({}))
}



const loginTest = async (req, res) => {
    
    await login2(req.body.email, req.body.password)
    res.status(OK).json(success({}))
}

module.exports = {
    register,
    login,
    loginTest
}