const express = require("express");
const router = express.Router();
const CommentController = require("./../controllers/commentController");

router
  .route("/comments")
  .get(CommentController.getAllComment)
  .post(CommentController.CreateComment);

router
  .route("/comments/:id")
  .get(CommentController.getByIdComment)
  .put(CommentController.updateComment)
  .delete(CommentController.deleteComment);


module.exports = { router }