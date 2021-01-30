/**
 * task model
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const stateTypes = ['TO DO', 'DONE']

const TaskSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    description: { type: String, lowercase: true, required: true },
    state: {
      type: String,
      default: stateTypes[0],
      uppercase: true,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Task', TaskSchema)
