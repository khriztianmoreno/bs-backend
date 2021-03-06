/**
 * User controller
 * .
 * GET     /api/users              ->  index
 * POST    /api/users              ->  create
 * GET     /api/users/:id          ->  show
 * PUT     /api/users/:id          ->  update
 * DELETE  /api/users/:id          ->  destroy
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
 */
const User = require('./user.model')
const Task = require('../task/task.model')

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity)
    }
  }
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end()
      return null
    }
    return entity
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500
  return function (err) {
    console.log('Error customer server: ', err)
    res.status(statusCode).send(err)
  }
}

/**
 * Get list of users
 */
function index(_, res) {
  return User.find({})
    .sort({ createdAt: -1 })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res))
}

/**
 * Creates a new user
 */
function create(req, res) {
  const user = new User(req.body)

  return user.save().then(respondWithResult(res, 201)).catch(handleError(res))
}

/**
 * Get a single user
 */
function show(req, res) {
  const { id: userId } = req.params

  return User.findById(userId)
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res))
}

/**
 * Deletes a user
 */
function destroy(req, res) {
  const { id: userId } = req.params

  return Promise.all([
    Task.deleteMany({ userId }).exec(),
    User.findByIdAndDelete(userId),
  ])
    .then(result => Promise.resolve(result[1]))
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res))
}

/**
 * Updates a user
 */
function update(req, res) {
  const { id: userId } = req.params
  const { name } = req.body

  return User.findByIdAndUpdate(
    { _id: userId },
    { name },
    { upsert: true, new: true }
  )
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res))
}

module.exports = {
  create,
  destroy,
  index,
  show,
  update,
}
