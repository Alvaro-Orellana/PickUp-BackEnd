const { UNAUTHORIZED, FORBIDDEN, INTERNAL_SERVER_ERROR } = require('http-status')
const { jwtScopes, errorMessages } = require('../constants')
const { error } = require('./error.middleware')
const { decodeJwt } = require('../utils')
const { firebase, admin } = require('../queries/database')


const authorization = (req, res, next) => {
    const header = req.header('Authorization')
    if (!header) {
        return res.status(UNAUTHORIZED).json(error("No header present", UNAUTHORIZED));
    } else {
        const token = header.replace('Bearer', '').trim()
        var user = firebase.auth().currentUser;
        if (user) {
            admin.auth().verifyIdToken(token)
                .then(function (decodedToken) {
                    if (decodedToken.uid === user.uid) {
                        req.user = user.uid
                        return next()
                    }
                }).catch(function (err) {
                    return res.status(INTERNAL_SERVER_ERROR).json(error(err, INTERNAL_SERVER_ERROR));
                });
        } else {
            console.log("There is no current user.");
            return res.status(UNAUTHORIZED).json(error("Invalid token", UNAUTHORIZED));
        }
    }
};



module.exports = { authorization }