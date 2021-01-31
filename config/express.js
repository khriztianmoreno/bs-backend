/**
 * Express configuration
 */

const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const errorHandler = require('errorhandler')
const methodOverride = require('method-override')
const morgan = require('morgan')

module.exports = app => {
  const env = app.get('env')

  app.use(compression())
  app.use(cors())
  app.use(morgan('dev'))
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(methodOverride())

  if (env === 'development' || env === 'test') {
    app.use(errorHandler()) // Error handler - has to be last
  }
}
