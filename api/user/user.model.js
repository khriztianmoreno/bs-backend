/**
 * user model
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: {
      lowercase: true,
      minLength: 3,
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
)

/**
 * Virtuals
 */

// Public profile information
UserSchema.virtual('profile').get((() => ({ name: this.name }), this))

/**
 * Validations
 */

// Validate empty email
UserSchema.path('name').validate(function (name) {
  return name.length
}, 'name cannot be blank')

// Validate name is not taken
UserSchema.path('name').validate(function (value) {
  return this.constructor
    .findOne({ name: value })
    .exec()
    .then(user => {
      if (user) {
        if (this.id === user.id) {
          return true
        }
        return false
      }
      return true
    })
    .catch(function (err) {
      throw err
    })
}, 'The specified name is already in use.')

module.exports = mongoose.model('User', UserSchema)
