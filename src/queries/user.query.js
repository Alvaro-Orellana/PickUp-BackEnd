const { admin, db, firebase } = require('./database')
const { USERS_COLLECTION, RESERVAS_COLLECTION } = require('../config/vars')
const moment = require('moment')


const fetchUserByEmail = async (email) => {
    const userRefs = db.collection(USERS_COLLECTION)
    let user;
    const snapshot = await userRefs.where('email', '==', email).limit(1).get()
    if (snapshot.empty) {
        console.log("Usuario no existe en la base")
    } else {
        snapshot.forEach(doc => {
            const data = doc.data();
            user = {
                name: data.name,
                lastname: data.lastname,
                created_date: data.created_date,
                update_date: data.update_date,
                email: data.email,

            }
        })
    }

    return user;
    
}


const saveUser = async (user) => {
    try {
        const userRefs = db.collection(USERS_COLLECTION);
        user.created_date = moment().toString()
        user.update_date = moment().toString()

        const userToSave = {
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            created_date: user.created_date,
            update_date: user.update_date
        }

        await userRefs.doc(user.email).set(userToSave)
        return userToSave
    } catch (error) {
        throw error;
    }
}

const updateUser = async (user) => {
    try {
        const userRefs = db.collection(USERS_COLLECTION).doc(user.email);
        user.update_date = moment().toString()
        await userRefs.update(user)
    } catch (error) {

    }
}

const fetchUsers = async () => {

    const userRefs = db.collection(USERS_COLLECTION)
    let users = []
    userRefs.get()
        .then(snapshot => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    console.log(data.email)
                    users.push({
                        name: data.name,
                        email: data.email
                    })
                })
            }
            return users;
        }).catch(err => {
            console.log(`Error getting the document : ${err}`)
        })
}


module.exports = { fetchUserByEmail, saveUser, fetchUsers, updateUser }