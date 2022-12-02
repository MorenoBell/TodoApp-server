const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: String,
  roles: {
    User: {
      type: Boolean,
      default: true
    },
    Admin: Boolean,
  },
  todos: [
    { type: Schema.Types.ObjectId, ref: 'Todo' }
  ]
});

module.exports = mongoose.model('User', userSchema);