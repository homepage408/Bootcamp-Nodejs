const express = require("express");
const router = express.Router();
const BookController = require("./../controller/bookController");

router
  .route("/books")
  .get(BookController.getAllBook)
  .post(BookController.createBook);

router
  .route("/books/:id")
  .get(BookController.getBookById)
  .put(BookController.updateBook)
  .delete(BookController.deleteBooks);

module.exports = { router };
