const express = require("express");
const router = express.Router();
const UserController = require("./../controller/userController");
const { uploadPhotoUsers } = require("../utils/helpers/uploadPhotoUser");

router
  .route("/users")
  .post(UserController.createUser)
  .get(UserController.getAllUser);

router.route("/users/:id").get(UserController.getByIdUser);
router
  .route("/users/:id/photo")
  .post(uploadPhotoUsers.single("urlPhoto"), UserController.uploadPhoto);

module.exports = { router };
