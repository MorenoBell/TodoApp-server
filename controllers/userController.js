const User = require('../models/User')
const bcrypt = require('bcryptjs');
const createNewUser = async (rq, res) => {
  const salt = bcrypt.genSaltSync(10);
  const { user, pwd } = rq.body;
  if (user && pwd) {
    const arleadyExUser = await User.findOne({ username: user });
    if (arleadyExUser) {
      res.status(201).json({ "message": "A user with this username arleady exists" });
    }
    else {
      const hashedpw = bcrypt.hashSync(pwd, salt);
      const newUser = await User.create({
        username: user,
        password: hashedpw
      });
      res.status(201).json({ "user": newUser });
    }
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
    const user = await User.findOne({ username: username })
    let id;
    if (user && bcrypt.compareSync(password, user.password)) {
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