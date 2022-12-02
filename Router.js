const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController');
const todoController = require('./controllers/TodoController');
//ALL THE ENDPOINTS GO HERE, WE IMPORT CONTROLLERS AND USER CONTROLLER.METHOD
router.post('/createNewUser', userController.createNewUser);
router.post('/deleteUser', userController.deleteUser);
router.post('/allUsers', userController.allUsers);
router.post('/loginUser', userController.loginUser);
router.post('/addTodo', todoController.addTodo);
router.post('/getTodosByUser', todoController.getTodosByUser);
router.post('/deleteTodo', todoController.deleteTodo);
router.post('/changeTodoState', todoController.changeTodoState);

module.exports = router