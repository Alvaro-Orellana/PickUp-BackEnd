const environment = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
}

const errorMessages = {
  UNAUTHORIZED: 'Unauthorized.',
  FORBIDDEN: 'Forbidden.',
  NOT_FOUND: 'Not found.',
  CONFLICT: 'Conflict.',
  UNPROCESSABLE_ENTITY: 'Unprocessable entity.',
  INTERNAL_SERVER_ERROR: 'Internal server error.',
}

const codeErrorIndex = {
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  422: 'UNPROCESSABLE_ENTITY',
  500: 'INTERNAL_SERVER_ERROR',
}

module.exports = { environment, errorMessages, codeErrorIndex }
