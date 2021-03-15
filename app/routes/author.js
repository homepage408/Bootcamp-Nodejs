const express = require("express");
const AuthorController = require("./../controller/authorController");
const router = express.Router();
const validation = require("./../utils/middleware/validation");
const { creatAuthor } = require("./../utils/helpers/valYum");
const { verifyJwt, permit } = require("./../utils/middleware/authJwt");

[verifyJwt, permit("admin")];
router
  .route("/authors")
  .post(
    [validation(creatAuthor), verifyJwt, permit("admin")],
    AuthorController.createAuthor
  )
  .get([verifyJwt, permit("guest","admin")],AuthorController.getAllAuthor);

router
  .route("/authors/:id")
  .delete([verifyJwt, permit("admin")],AuthorController.deleteAuthor)
  .put([verifyJwt, permit("admin")],AuthorController.updateAuthor)
  .get([verifyJwt, permit("admin")],AuthorController.getByIdAuthor);

router.route("/authors/:id/books").get(AuthorController.getAllBookAuthor);

module.exports = { router };
