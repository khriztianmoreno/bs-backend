/**
 * Main application file
 */

const express = require('express')
const mongoose = require('mongoose')
const http = require('http')

const config = require('./config/environment')
const expressConfig = require('./config/express')
const routeConfig = require('./routes')

// Connect to MongoDB
mongoose.connect(config.mongo.uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.connection.on('error', err => {
  console.error('Error', 'MongoDB connection error', {
    data: err,
    time: new Date().toISOString(),
  })
  process.exit(-1)
})

// Setup server
const app = express()
const server = http.createServer(app)

expressConfig(app)
routeConfig(app)

// Start server
function startServer() {
  app.bsChallengeBK = server.listen(config.port, config.ip, () => {
    console.log(
      `Express server listening on ${config.port}, in ${app.get('env')} mode`
    )
  })
}

setImmediate(startServer)

// Expose app
module.exports = app
