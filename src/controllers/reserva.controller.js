const { OK } = require('http-status')
const { success } = require('../middlewares/success.middleware')
const { validateUser } = require('../utils')
const { error } = require('../middlewares/error.middleware')
const { fetchReservaByCod, addReserva } = require('../queries/reserva.query')

const test = async (req, res) => {
    try {
        const reserva = req.body
        await addReserva(reserva)
        res.status(OK).json(success(reserva))
    } catch (err) {
        console.log(err)
        res.status(500).json(error('No se puede registrar', 500))
    }

}

const getReservasByUser = async (req, res) => {
    const { userId } = req.params

    res.status(OK).json(success({}))
}

const busquedaTest = async (req, res) => {
    await buscarReserva(req.body.cod)
    res.status(OK).json(success())
}


module.exports = {
    test,
    busquedaTest,
    getReservasByUser
}