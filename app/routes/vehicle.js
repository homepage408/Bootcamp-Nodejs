const express = require("express");
const router = express.Router();
const VehicleController = require("./../controller/vehicleController");
const validation = require("./../utils/middleware/validation");
const { createUpdateVehicle } = require("./../utils/helpers/yum");
const { uploadVehicle } = require("./../utils/helpers/uploadPhoto");
const { verifyJWT, permit } = require("./../utils/middleware/authJwt");

router
  .route("/vehicles")
  .get([verifyJWT, permit("admin")], VehicleController.getAllVehicle)
  .post(
    [verifyJWT, permit("admin"), validation(createUpdateVehicle)],
    VehicleController.createVehicle
  );

router
  .route("/vehicle/rentoff")
  .get(
    [verifyJWT, permit("admin", "guest")],
    VehicleController.getAllVehicleOffRent
  );

router
  .route("/vehicle/:id")
  .get([verifyJWT, permit("admin")], VehicleController.getByIdVehicle)
  .put(
    [verifyJWT, permit("admin"), validation(createUpdateVehicle)],
    VehicleController.updateVehicle
  )
  .delete(
    [verifyJWT, permit("admin")],
    VehicleController.deletVehicle
  );

router
  .route("/vehicle/:id/upload")
  .post(uploadVehicle.single("urlVehicle"), VehicleController.uploadVehicle);

module.exports = { router };
