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



const register2 = async (user) => {
    const userExist = await getUserByEmail(user.email)
    if (!userExist) {
        try {
            await auth.createUserWithEmailAndPassword(user.email, user.password)
            await saveUser(user)
        } catch (err) {
            console.log(err)
        }


    } else {
        console.log("Error de validacion")
    }

}

const mostrar = async () => {

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


const saveUser = async (user) => {

    const userRefs = db.collection('users');
    await userRefs.doc(user.email).set(user)
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
            console.log(user)
            return user;
        }).catch(err => {
            console.log(`Error getting the document : ${err}`)
        })
}

module.exports = { login2, register2, mostrar }