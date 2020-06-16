
const admin = require('firebase-admin');
const serviceAccount = require("../config/serviceAccountKey.json");
const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/firestore')
const firebaseConfig = {
    apiKey: "AIzaSyAzpCvoXPlnvcRT3Cod8aS6saQ9nDmAZO0",
    authDomain: "pick-up-a3469.firebaseapp.com",
    databaseURL: "https://pick-up-a3469.firebaseio.com",
    projectId: "pick-up-a3469",
    storageBucket: "pick-up-a3469.appspot.com",
    messagingSenderId: "1093410536288",
    appId: "1:1093410536288:web:6e78fe9933be67a7babc05",
    measurementId: "G-CTZP30YZRW"
  };

//initialize admin SDK using serviceAcountKey
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

firebase.initializeApp(firebaseConfig)


const db = firebase.firestore()

module.exports = { admin, firebase, db }