const express = require("express");
// const user = require('../db/models/user')
const router = express.Router();
const UserController = require("./../controllers/userController");

router
  .route("/users")
  .post(UserController.createUser)
  .get(UserController.getAllUser);

router
  .route("/users/:id")
  .get(UserController.getByIdUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

router.route("/users/:id/todos").get(UserController.getByIdUserTodos)

module.exports = { router };
