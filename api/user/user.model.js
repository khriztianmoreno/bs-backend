/**
 * user model
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: { type: String, lowercase: true, required: true, unique: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

/**
 * Virtuals
 */

// Public profile information
UserSchema.virtual('profile').get((() => ({ name: this.name }), this))

module.exports = mongoose.model('User', UserSchema)
