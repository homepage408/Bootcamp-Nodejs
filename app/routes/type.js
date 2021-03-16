const express = require("express");
const router = express.Router();
const TypeController = require("./../controller/typeController");
const { verifyJWT, permit } = require("./../utils/middleware/authJwt");
const validation = require("./../utils/middleware/validation");
const { createUpdateType } = require("./../utils/helpers/yum");

router
  .route("/types")
  .get([verifyJWT, permit("admin")], TypeController.getAllType)
  .post(
    [verifyJWT, permit("admin"), validation(createUpdateType)],
    TypeController.createTypes
  );
router
  .route("/types/:id")
  .delete([verifyJWT, permit("admin")], TypeController.deleteTypes)
  .get(
    [verifyJWT, permit("admin", "guest")],
    TypeController.getAllVehicleFiltering
  );

module.exports = { router };
