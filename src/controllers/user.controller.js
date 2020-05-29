const { OK } = require( 'http-status')
const { success } = require( '../middlewares/success.middleware')

const register = async (req, res) => {
    res.status(OK).json(success({}))
}

const login = async (req, res) => {
    res.status(OK).json(success({}))
}

const loginTest = async (req, res) => {
    res.status(OK).json(success({}))
}

module.exports = {
    register,
    login,
    loginTest
}