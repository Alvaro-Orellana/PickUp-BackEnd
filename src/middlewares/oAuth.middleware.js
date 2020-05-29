const { UNAUTHORIZED } = require('http-status')
const { OAuthApiKey } = require('../config/vars');
const { error } = require('./error.middleware');

const oAuth = () => (req, res, next) => {
  const { body: { apiKey } } = req;
  if (apiKey !== OAuthApiKey) {
    return res.status(UNAUTHORIZED).json(error('Unauthorized.', UNAUTHORIZED))
  }
  return next();
}

module.exports = { oAuth }