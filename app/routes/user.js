const express = require("express");
const router = express.Router();
const UserController = require("./../controller/userController");
const validation = require("./../utils/middleware/validation");
const { createUpdateUser } = require("./../utils/helpers/yum");
const { uploadPhotoUser } = require("./../utils/helpers/uploadPhoto");
const { verifyJWT, permit } = require("./../utils/middleware/authJwt");

router
  .route("/users")
  .get([verifyJWT, permit("admin")], UserController.getAllUser)
  .post(
    [verifyJWT, permit("admin"), validation(createUpdateUser)],
    UserController.createUser
  );
router
  .route("/users/:id")
  .get([verifyJWT, permit("admin")], UserController.getByIdUser)
  .put(
    [verifyJWT, permit("admin"), validation(createUpdateUser)],
    UserController.updateUser
  )
  .delete([verifyJWT, permit("admin")], UserController.deleteUser);

router
  .route("/user/:id/upload")
  .post(
    [verifyJWT, permit("admin")],
    uploadPhotoUser.single("urlUser"),
    UserController.uploadUser
  );

module.exports = { router };
