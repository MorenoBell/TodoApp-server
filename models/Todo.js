const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Todo', todoSchema);