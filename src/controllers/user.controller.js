const { OK, BAD_REQUEST, NO_CONTENT, INTERNAL_SERVER_ERROR } = require('http-status')
const { success } = require('../middlewares/success.middleware')
const { validateUser, validateEmail } = require('../utils')
const { error } = require('../middlewares/error.middleware')
const { loginUser, registerUser } = require('../queries/auth.query')
const { updateUser, fetchUserByEmail } = require('../queries/user.query')

const register = async (req, res) => {
    try {
        const user = req.body
        console.log(user);
        if (validateUser(user)) {
            const response = await registerUser(user)
            if(!response){
                return res.status(BAD_REQUEST).json(error('Usuario existente', BAD_REQUEST))
            }
         
            const logInResponse = await loginUser(response.email, user.password)
            return res.status(OK).json(success(logInResponse))
        } else {
            return res.status(BAD_REQUEST).json(error('No se puede registrar', BAD_REQUEST))
        }
    } catch (err) {
        console.log(err)
        return res.status(INTERNAL_SERVER_ERROR).json(error(err, INTERNAL_SERVER_ERROR))
    }
   
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!validateEmail(email)) {
            return res.status(BAD_REQUEST).json(error("Mail invalido", BAD_REQUEST))
        }
        const response = await loginUser(email, password)
        if (!response) {
            return res.status(OK).json(error("Usuario no encontrado", NO_CONTENT))
        }
        return res.status(OK).json(success(response, OK))
    } catch (err) {
        console.log("ERR", err)
        return res.status(INTERNAL_SERVER_ERROR).json(error(err, INTERNAL_SERVER_ERROR))
    }
   
}

const saveInitialData = async (req, res) => {
    try {
        const user = req.body;      
        const response = await updateUser(user);
        if (!response) {
            return res.status(OK).json(error("Usuario no encontrado", NO_CONTENT))
        }
        return res.status(OK).json(success(response, OK))
    } catch (err) {
        console.log("ERR", err)
        return res.status(INTERNAL_SERVER_ERROR).json(error(err, INTERNAL_SERVER_ERROR))
    }
}

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.query;     
        console.log(req.params); 
        if(!email){
            return res.status(OK).json(error("Usuario no encontrado", NO_CONTENT))
        }
        const response = await fetchUserByEmail(email);
        if (!response) {
            return res.status(NO_CONTENT).json(error("Usuario no encontrado", NO_CONTENT))
        }
        return res.status(OK).json(success(response, OK))
    } catch (err) {
        console.log("ERR", err)
        return res.status(INTERNAL_SERVER_ERROR).json(error(err, INTERNAL_SERVER_ERROR))
    }
}

module.exports = {
    register,
    login,
    saveInitialData,
    getUserByEmail
}