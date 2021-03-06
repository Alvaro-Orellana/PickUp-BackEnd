const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, NOT_FOUND } = require('http-status')
const { success } = require('../middlewares/success.middleware')
const { error } = require('../middlewares/error.middleware')
<<<<<<< HEAD
const { addReserva, fetchReservasByUser, acceptReserva, cancelReserva } = require('../queries/reserva.query')
=======
const { fetchReservaByCod, addReserva, fetchReservasByUser, fetchReservas } = require('../queries/reserva.query')
>>>>>>> 395754fc3f53a0a9a86ea0d1d7725b6e64fe8716
const { defaultLimit, defaultOffset } = require('../config/vars')
const { isValidAddress } = require('../utils')

const generateReserva = async (req, res) => {
    try {
        const reserva = req.body
        console.log(reserva.address)
        if(!isValidAddress(reserva.address)){
            return res.status(BAD_REQUEST).json(error("Direccion invalida", BAD_REQUEST))
        }
        const response = await addReserva(reserva)
        if (!response) {
            return res.status(NOT_FOUND).json(error())
        }
        return res.status(OK).json(success(response))
    } catch (err) {
        console.log(err)
        res.status(INTERNAL_SERVER_ERROR).json(error('No se puede generar reserva', INTERNAL_SERVER_ERROR))
    }
}

const accept = async (req, res) => {
    try {
        const reserva = req.body
        const response = await acceptReserva(reserva.driver, reserva.reservaId);
        if (!response) {
            return res.status(NOT_FOUND).json(error())
        }
        return res.status(OK).json(success(reserva))
    } catch (err) {
        console.log(err)
        res.status(INTERNAL_SERVER_ERROR).json(error('No se puede aceptar', INTERNAL_SERVER_ERROR))
    }
}

const cancel = async (req, res) => {
    try {
        const reserva = req.body
        const response = await cancelReserva(reserva.reservaId);
        if (!response) {
            return res.status(NOT_FOUND).json(error())
        }
        return res.status(OK).json(success(reserva))
    } catch (err) {
        console.log(err)
        res.status(INTERNAL_SERVER_ERROR).json(error('No se puede aceptar', INTERNAL_SERVER_ERROR))
    }
}

const getReservasByUser = async (req, res) => {
    try {
        const { userId } = req.params
        let { limit, offset } = req.query;
        
        if(!userId){
            res.status(BAD_REQUEST).json(error("Se requiere usuario"), BAD_REQUEST);
        }
    
        if(!limit){
            limit = defaultLimit;
        }
        
        if(!offset){
            offset = defaultOffset;
        }
        const response = await fetchReservasByUser(userId, limit, offset);
    
        res.status(OK).json(success({response}));
    } catch (error) {
        console.log(err)
        res.status(INTERNAL_SERVER_ERROR).json(error('Error inesperado', INTERNAL_SERVER_ERROR))
    }
   
}

<<<<<<< HEAD
module.exports = {
    accept,
    cancel,
    generateReserva,
    getReservasByUser
=======
const busquedaTest = async (req, res) => {
    await buscarReserva(req.body.cod)
    res.status(OK).json(success())
}

const getReservas = async (req, res) => {
    try {
        const { userId } = req.params
        
        if(!userId){
            res.status(BAD_REQUEST).json(error("Se requiere usuario"), BAD_REQUEST);
        }

        const response = await fetchReservas();
    
        res.status(OK).json(success({response}));
    } catch (error) {
        console.log(err)
        res.status(INTERNAL_SERVER_ERROR).json(error('Error inesperado', INTERNAL_SERVER_ERROR))
    }
   
}

module.exports = {
    test,
    busquedaTest,
    getReservasByUser,
    getReservas
>>>>>>> 395754fc3f53a0a9a86ea0d1d7725b6e64fe8716
}