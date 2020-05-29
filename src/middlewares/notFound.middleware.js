const { NOT_FOUND } = require( 'http-status')
const { error } = require(".");
const { errorMessages } = require( "../constants");

const notFound = (req, res) => res.status(NOT_FOUND)
  .json(error(errorMessages.NOT_FOUND, NOT_FOUND))

module.exports = { notFound }