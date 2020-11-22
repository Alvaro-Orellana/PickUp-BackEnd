const moment = require('moment')
const { v4: uuidv4 } = require('uuid')
const { admin, db, firebase } = require('./database')
const { RESERVAS_COLLECTION } = require('../config/vars')

const fetchReservaByCod = async (cod) => {
    const reservaRefs = db.collection(RESERVAS_COLLECTION)
    let reserva = {}
    reservaRefs.where('cod', '==', cod).limit(1).get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log("Reserva no existe en la base")
            } else {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    reserva = {
                        cod: data.cod
                    }
                })
            }
            console.log(reserva)
            return reserva;
        }).catch(err => {
            console.log(`Error getting the document : ${err}`)
        })
}


const addReserva = async (reserva) => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            reserva.creation_date = moment().toString()
            reserva.status = "Open"
            saveReserva(reserva)
        } else {
            console.log('no login')
        }
    })
    return reserva
}

const acceptReserva = async (driver, reservaId) => {
    const reservaRefs = db.collection(RESERVAS_COLLECTION).doc(reservaId);
    const reservaExistente = await fetchReservaById(reservaId);
    if (reservaExistente) {
        if (reservaExistente.status === "Open") {
            await reservaRefs.update(
                {
                    driver: driver,
                    status: 'In Progress',
        
                });   
            }
            return await fetchReservaById(reservaId);
        }           
}

const cancelReserva = async (reservaId) => {
    const reservaRefs = db.collection(RESERVAS_COLLECTION).doc(reservaId);
   
    await reservaRefs.update(
        {                   
            status: 'Cancel',

        });   
            
    return await fetchReservaById(reservaId);
                
}

const fetchReservaById = async (reservaId) => {
    let reserva;
    const doc = await db.collection(RESERVAS_COLLECTION).doc(reservaId).get();
    console.log()
    if (!doc.exists) {
        console.log("Reserva no existe en la base")
    } else {      
        const data = doc.data();
        reserva = data;       
    }

    return reserva;
}

const saveReserva = async (reserva) => {
    const reservaRefs = db.collection(RESERVAS_COLLECTION)
    await reservaRefs.doc(uuidv4().toString()).set(reserva)
}

const fetchReservas = async () => {

    const reservasRefs = db.collection(RESERVAS_COLLECTION)
    
    let reservas = []
    reservaRefs.where('finalizado', '==', false).get()
        .then(snapshot => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    reservas.push({
                        cod: data.cod,

                    })
                })
            }
            return reservas;
        }).catch(err => {
            console.log(`Error getting the document : ${err}`)
        })
}



const fetchReservasByUser = async (userId, limit, offset) => {
    const reservaRefs = db.collection(RESERVAS_COLLECTION)
    let reservas = []
    const snapshot = await reservaRefs.where('usuario.id', '==', userId).limit(limit).offset(offset).get();

    if (snapshot.empty) {
        console.log("Usuario no existe en la base")
    } else {
        snapshot.forEach(doc => {
            const data = doc.data();
            reservas.push(data)

        })
    }

    return reservas;
}

<<<<<<< HEAD
module.exports = { addReserva, fetchReservaByCod, saveReserva, fetchReservasByUser, acceptReserva, cancelReserva }
=======
module.exports = { addReserva, fetchReservaByCod, saveReserva, fetchReservasByUser, fetchReservas }
>>>>>>> 395754fc3f53a0a9a86ea0d1d7725b6e64fe8716
