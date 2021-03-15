const express = require("express");
const router = express.Router();
const AuthController = require("./../controller/authController");
const validation = require("./../utils/middleware/validation");
const { login } = require("./../utils/helpers/valYum");

router.route("/login").post(validation(login), AuthController.login);

module.exports = { router };
