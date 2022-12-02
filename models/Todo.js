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
});

module.exports = mongoose.model('Todo', todoSchema);