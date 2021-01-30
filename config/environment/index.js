/**
 * Default specific configuration
 * @author: Cristian Moreno Zulauaga <khriztianmoreno@gmail.com>
 */
const path = require('path')
const merge = require('lodash/merge')

const env = (process.env.NODE_ENV = process.env.NODE_ENV || 'development')

require('dotenv').config({
  path: `.env.${env}`,
})

let envFile = require('./development.js')

if (env === 'production') {
  envFile = require('./production.js')
}

const all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 3030,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'buNny-5tud10-ch4nllEng3',
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true,
      },
      useMongoClient: true,
      poolSize: 2,
    },
  },
}

// Export the config object based on the NODE_ENV
// =============================================
module.exports = merge(all, envFile || {})
