const express = require("express");
const router = express.Router();
const PublisherController = require("./../controller/publisherController");
const validation = require("./../utils/middleware/validation");
const { createPublisher } = require("./../utils/helpers/valYum");
const { verifyJwt, permit } = require("./../utils/middleware/authJwt");

router
  .route("/publisher")
  .post(
    [validation(createPublisher), verifyJwt, permit("admin")],
    PublisherController.createPublisher
  )
  .get([verifyJwt, permit("guest","admin")], PublisherController.getAllPublisher);

router
  .route("/publisher/:id")
  .get([verifyJwt, permit("admin")], PublisherController.getByIdPublisher)
  .put([verifyJwt, permit("admin")], PublisherController.updatePublisher)
  .delete([verifyJwt, permit("admin")], PublisherController.deletPublisher);

router
  .route("/publisher/:id/books")
  .get([verifyJwt, permit("guest")], PublisherController.getAllBookPublisher);

module.exports = { router };
