const { db, auth } = require('./database')
const { USERS_COLLECTION } = require('../config/vars')


const login2 = async (email, password) => {
    // Aca devuelvan el objeto que esta en la collecion 'users' con el mail
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("Mail del usuario registrado", userCredential.user.email)
        }).catch(err => {
            console.log("ERR", err)
        })

}

const register = async (user) => {
    const userExist = await getUserByEmail(email)
    if (!userExist) {
        await auth.createUserWithEmailAndPassword(user.email, user.password)


    } else {
        console.log("Error de validacion")
    }

}

const saveUser = async (user) => {

    const userRefs = db.collection('users');
    await userRefs.doc(USERS_COLLECTION).set(user)
}

const getUserByEmail = async (email) => {
    const userRefs = db.collection(USERS_COLLECTION)
    let user = {}
    userRefs.where('email', '==', email).limit(1).get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log("Usuario no existe en la base")
            } else {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    user = {
                        name: data.name,
                        email: data.email
                    }
                })
            }
            return user;
        }).catch(err => {
            console.log(`Error getting the document : ${err}`)
        })
}

module.exports = { login2, register }