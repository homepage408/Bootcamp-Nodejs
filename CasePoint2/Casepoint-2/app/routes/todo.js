const express = require("express");
const router = express.Router();
const TodoController = require("./../controllers/todosController");

router
  .route("/todos")
  .get(TodoController.getAllTodo)
  .post(TodoController.CreateTodo);

router
  .route("/todos/:id")
  .get(TodoController.getByIdTodo)
  .put(TodoController.updateTodo)
  .delete(TodoController.deleteTodo);

router.route("/todos/:id/comments").get(TodoController.getByIdTodoComment);


module.exports = { router };
