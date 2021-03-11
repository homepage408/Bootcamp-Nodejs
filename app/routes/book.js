const express = require("express");
const { uploadCover } = require("../utils/helpers/uploadCover");
const router = express.Router();
const BookController = require("./../controller/bookController");
const validation = require('./../utils/middleware/validation')
const createBook = require('./../utils/helpers/valYum')

router
  .route("/books")
  .get(BookController.getAllBook)
  .post(validation(createBook),BookController.createBook);

router
  .route("/books/:id")
  .get(BookController.getBookById)
  .put(validation(createBook),BookController.updateBook)
  .delete(BookController.deleteBooks);

router
  .route("/book/:id/upload")
  .post(uploadCover.single('urlCover'), BookController.uploadCover);

module.exports = { router };
