/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tasks              ->  index
 * POST    /api/tasks              ->  create
 * GET     /api/tasks/:id          ->  show
 * PUT     /api/tasks/:id          ->  update
 * DELETE  /api/tasks/:id          ->  destroy
 * GET     /api/tasks/user/:id     ->  byUser
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
 */

const merge = require('lodash/merge')

const Task = require('./task.model')

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
 * Get list of task
 */
function index(_, res) {
  return Task.find({})
    .sort({ createdAt: -1 })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res))
}

/**
 * Creates a new task
 */
function create(req, res) {
  return Task.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res))
}

/**
 * Get a single task
 */
function show(req, res) {
  const { id: taskId } = req.params

  return Task.findById(taskId)
    .populate('userId', '-_id -__v')
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res))
}

/**
 * Deletes a task
 */
function destroy(req, res) {
  const { id: taskId } = req.params

  return Task.findByIdAndDelete(taskId)
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res))
}

/**
 * Updates a task
 */
function update(req, res) {
  const { id: taskId } = req.params

  return Task.findByIdAndUpdate({ _id: taskId }, req.body, {
    upsert: true,
    new: true,
  })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res))
}

/**
 * Get tasks by user
 */
function byUser(req, res) {
  const { id: userId } = req.params

  return Task.find({ userId })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res))
}

module.exports = {
  byUser,
  create,
  destroy,
  index,
  show,
  update,
}
