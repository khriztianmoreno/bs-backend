/**
 * Main application routes
 */

// Import Endpoints
const helloWorld = require('./api/helloworld')
const user = require('./api/user')
const task = require('./api/task')

module.exports = app => {
  app.use('/api/helloworld', helloWorld)
  app.use('/api/users', user)
  app.use('/api/tasks', task)
}
