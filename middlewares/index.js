const mongoose = require('mongoose')

function validateParamId(req, res, next) {
  const { id } = req.params
  const checkId = mongoose.Types.ObjectId.isValid(id)

  if (checkId) {
    next()
  } else {
    res.status(400).send('The Id parameter is not a valid value')
  }
}

module.exports = {
  validateParamId,
}
