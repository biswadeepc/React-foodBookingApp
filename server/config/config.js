require('dotenv').config();

module.exports = {
  version: '1.0.0',
  canonical_url: process.env.APPLICATION_ROOT,
  api: {
    host: process.env.API_HOST,
    key: process.env.API_KEY,
    secret: process.env.API_SECRET,
  },
  sessionName: '_fbaId',
  secret: 'fba@34$*&01775',
  dbConnection : process.env.DB_STRING,
  port: process.env.PORT,
  plugins: [
    'plugin-one',
    'plugin.two'
  ]
};