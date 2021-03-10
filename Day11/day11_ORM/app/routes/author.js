const express = require("express");
const AuthorController = require("./../controller/authorController");
const router = express.Router();

router
  .route("/authors")
  .post(AuthorController.createAuthor)
  .get(AuthorController.getAllAuthor);

router
  .route("/authors/:id")
  .delete(AuthorController.deleteAuthor)
  .put(AuthorController.updateAuthor)
  .get(AuthorController.getByIdAuthor);

router.route("/authors/:id/books").get(AuthorController.getAllBookAuthor);

module.exports = { router };
