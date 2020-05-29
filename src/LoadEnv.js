const { config } = require('dotenv-safe')
const { join } = require('path');

if (process.env.NODE_ENV !== 'production') {
  config({
    path: join(__dirname, '../.env'),
    sample: join(__dirname, '../.env.example'),
  })
}
