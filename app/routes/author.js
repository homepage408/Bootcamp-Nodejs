const express = require("express");
const AuthorController = require("./../controller/authorController");
const router = express.Router();
const validation = require("./../utils/middleware/validation");
const {creatAuthor} = require("./../utils/helpers/valYum");

router
  .route("/authors")
  .post(validation(creatAuthor), AuthorController.createAuthor)
  .get(AuthorController.getAllAuthor);

router
  .route("/authors/:id")
  .delete(AuthorController.deleteAuthor)
  .put(validation(creatAuthor),AuthorController.updateAuthor)
  .get(AuthorController.getByIdAuthor);

router.route("/authors/:id/books").get(AuthorController.getAllBookAuthor);

module.exports = { router };
