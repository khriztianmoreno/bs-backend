/**
 * Using Rails-like standard naming convention for endpoints.
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
 */

const User = require('./user.model')

function validationError(res, statusCode) {
  const statusCodeLocal = statusCode || 422
  return err => res.status(statusCodeLocal).json(err)
}

function handleEntityNotFound(res) {
  return entity => {
    if (!entity) {
      res.status(404).end()
      return null
    }
    return entity
  }
}

function handleError(res, statusCode) {
  const statusCodeLocal = statusCode || 500
  return err => res.status(statusCodeLocal).send(err)
}

/**
 * Get list of users
 */
async function index(_, res) {
  try {
    const users = await User.find({}).exec()
    return res.status(200).json(users)
  } catch (error) {
    return handleError(res)
  }
}

/**
 * Creates a new user
 */
async function create(req, res) {
  const user = new User(req.body)

  try {
    const newUser = await user.save()
    return res.json(newUser)
  } catch (error) {
    return validationError(res)
  }
}

/**
 * Get a single user
 */
async function show(req, res, next) {
  const { id: userId } = req.params

  try {
    const user = await User.findById(userId).exec()
    if (!user) {
      return handleEntityNotFound(res)
    }
    return res.json(user)
  } catch (error) {
    next(error)
  }
}

/**
 * Deletes a user
 */
async function destroy(req, res) {
  const { id: userId } = req.params

  try {
    await User.findByIdAndDelete(userId).exec()
    return res.status(204).end()
  } catch (error) {
    return handleError(res)
  }
}

/**
 * Updates a user
 */
async function update(req, res) {
  const { id: userId } = req.params
  const { name } = req.body

  try {
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { name },
      { upsert: true, new: true }
    ).exec()

    return res.status(200).json(user)
  } catch (error) {
    return handleError(res)
  }
}

module.exports = {
  create,
  destroy,
  index,
  show,
  update,
}
