const User = require('../models/User')

const createNewUser = async (rq, res) => {
  const { user, pwd } = rq.body;
  if (user && pwd) {
    const newUser = await User.create({
      username: user,
      password: pwd
    });
    res.status(201).json({ "user": newUser });
  }
  else {
    res.status(400).json({ "message": "username or pw not good" })
  }
}

const deleteUser = async (rq, res) => {
  const { userId } = rq.body;
  if (userId) {
    await User.deleteOne({ _id: userId })

    res.status(201).json({ "message": "user eliminated" })
  }
  else {
    res.status(400).json({ "message": "user not found" })
  }
}

const loginUser = async (rq, res) => {
  const { username, password } = rq.body;
  if (username && password) {
    const user = await User.findOne({ username: username, password: password })
    let id;
    if (user) {
      id = user._id;
    }
    res.status(201).json({ "id": id })
  }
  else {
    res.status(400).json({ "message": "user not found" })
  }
}

const allUsers = async (rq, res) => {
  const users = await User.find()
  res.status(201).json({
    "users": users
  })
}

module.exports = { createNewUser, allUsers, deleteUser, loginUser }