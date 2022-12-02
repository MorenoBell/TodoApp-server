const Todo = require('../models/Todo');
const User = require('../models/User');

const addTodo = async (req, res) => {
  const { description, userId } = req.body;
  if (description && userId) {
    const user = await User.findById(userId);
    const todo = new Todo();
    todo.description = description;
    todo.save();
    user.todos.push(todo);
    user.save();
    res.status(201).json({ "message": "All good", "status": "true" });
  }
  else {
    res.status(201).json({ "message": "description or user not found", "status": "false" })
  }
}

const deleteTodo = async (req, res) => {
  const { todoId } = req.body;
  let message = '';
  let status = false;
  if (todoId) {
    await Todo.deleteOne({ _id: todoId }).exec();
    message = "todo eliminated correctly";
    status = true;
  }
  else {
    message = "invalid todo id";
    status = false;
  }
  res.status(201).json({
    message: message,
    status: status
  });
}

const changeTodoState = async (req, res) => {
  const { todoId } = req.body;
  let status = false;
  let message = '';

  try {
    if (todoId) {
      const todo = await Todo.findById(todoId);
      if (todo) {
        Todo.findOneAndUpdate({ _id: todoId }, { checked: !todo.checked });
        status = true;
      }
      message = 'All good';
    }
    else {
      message = 'couldn\'t find the todo';
    }
  }
  catch (ex) {
    message = ex.message;
  }
  res.status(201).json({
    message: message,
    status: status
  });
}

const getTodosByUser = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId).exec();
  if (user) {
    const todos = await Todo.find().where('_id').in(user.todos).exec();
    res.status(201).json({ "message": "All good", "status": "true", "todos": todos });

  }
  else {
    res.status(201).json({ "message": "user not found", "status": "false" });
  }
}
module.exports = { addTodo, getTodosByUser, deleteTodo, changeTodoState }
