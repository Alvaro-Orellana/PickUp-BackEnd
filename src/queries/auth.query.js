const { admin, firebase, adminAuth } = require('./database')
const { USERS_COLLECTION, RESERVAS_COLLECTION } = require('../config/vars')
const { fetchUserByEmail, saveUser } = require('../queries/user.query')

const loginUser = async (email, password) => {

    // Aca devuelvan el objeto que esta en la collecion 'users' con el mail
    let response = {};
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)
    const idToken = await firebase.auth().currentUser.getIdToken(true)
    response.user = await fetchUserByEmail(userCredential.user.email)
    response.access_token = idToken
    return response
}

const registerUser = async (user) => {
    const userExist = await fetchUserByEmail(user.email)
    let userCreated;
    if (!userExist) {
        try {
            const response = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            const idToken = await response.user.getIdToken();
            userCreated =  await saveUser(user)
            userCreated.access_token = idToken

        } catch (err) {
            console.log(err)
        }
    } else {
        console.log("Error de validacion")
    }

    return userCreated;
}

module.exports = { loginUser, registerUser }
