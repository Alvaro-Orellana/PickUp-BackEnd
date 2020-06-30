const { admin, firebase } = require('./database')
const { USERS_COLLECTION, RESERVAS_COLLECTION } = require('../config/vars')

const fetchReservaByCod = async (cod) => {
    const reservaRefs = firebase.collection(RESERVAS_COLLECTION)
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
            reserva.usuario = {
                "id": user.uid,
                "email": user.email
            }
            saveReserva(reserva)
        } else {
            console.log('no login')
        }
    })
    return reserva
}

const saveReserva = async (reserva) => {
    const reservaRefs = firebase.collection(RESERVAS_COLLECTION)
    await reservaRefs.doc(reserva.cod).set(reserva)
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
    const reservaRefs = firebase.collection(RESERVAS_COLLECTION)
    let reservas = []
    const snapshot = reservaRefs.where('usuario.id', '==', userId).limit(limit).offset(offset).get();
    
    if (snapshot.empty) {
        console.log("Usuario no existe en la base")
    } else {
        snapshot.forEach(doc => {
            const data = doc.data();
            snapshot.forEach(doc => {
                const data = doc.data();               
                reservas.push(data)
               
            });
        })
    }

   return reservas;
}

module.exports = { addReserva, fetchReservaByCod, saveReserva, fetchReservasByUser, fetchReservas }