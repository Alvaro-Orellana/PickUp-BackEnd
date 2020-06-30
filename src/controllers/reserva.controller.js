const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('http-status')
const { success } = require('../middlewares/success.middleware')
const { validateUser } = require('../utils')
const { error } = require('../middlewares/error.middleware')
const { fetchReservaByCod, addReserva, fetchReservasByUser, fetchReservas } = require('../queries/reserva.query')
const { defaultLimit, defaultOffset } = require('../config/vars')

const test = async (req, res) => {
    try {
        const reserva = req.body
        await addReserva(reserva)
        res.status(OK).json(success(reserva))
    } catch (err) {
        console.log(err)
        res.status(INTERNAL_SERVER_ERROR).json(error('No se puede registrar', INTERNAL_SERVER_ERROR))
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
}