/**
 * Main application routes
 */

// Import Endpoints
const user = require('./api/user')
// const task = require('./api/task')

module.exports = app => {
  // Endpoints in plural
  app.use('/api/users', user)
  // app.use('/api/tasks', task)
}
