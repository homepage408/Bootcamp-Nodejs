const express = require("express");
const router = express.Router();
const RentalController = require("./../controller/rentallController");
const { verifyJWT, permit } = require("./../utils/middleware/authJwt");

router
  .route("/rental")
  .post([verifyJWT, permit("admin")], RentalController.createRental)
  .get([verifyJWT, permit("admin")], RentalController.getAllRental);

// router.route("/rental/:id").get(RentalController.getTotalPrice);
router
  .route("/rentals/:id/status")
  .patch([verifyJWT, permit("admin")], RentalController.getTotalPrice);

module.exports = { router };
