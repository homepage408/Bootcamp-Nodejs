const express = require("express");
const { uploadCover } = require("../utils/helpers/uploadCover");
const router = express.Router();
const BookController = require("./../controller/bookController");
const validation = require("./../utils/middleware/validation");
const { createBook } = require("./../utils/helpers/valYum");
const { verifyJwt, permit } = require("./../utils/middleware/authJwt");

router
  .route("/books")
  .get([verifyJwt, permit("guest","admin")], BookController.getAllBook)
  .post(
    [validation(createBook), verifyJwt, permit("admin")],
    BookController.createBook
  );

router
  .route("/books/:id")
  .get([verifyJwt, permit("admin")], BookController.getBookById)
  .put([verifyJwt, permit("admin")], BookController.updateBook)
  .delete([verifyJwt, permit("admin")], BookController.deleteBooks);

router
  .route("/book/:id/upload")
  .post(uploadCover.single("urlCover"), BookController.uploadCover);

module.exports = { router };
