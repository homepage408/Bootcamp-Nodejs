const express = require("express");
const PublisherController = require("./../controller/publisherController");
const router = express.Router();

router
  .route("/publisher")
  .post(PublisherController.createPublisher)
  .get(PublisherController.getAllPublisher);

router
  .route("/publisher/:id")
  .get(PublisherController.getByIdPublisher)
  .put(PublisherController.updatePublisher)
  .delete(PublisherController.deletePublisher);

router
  .route("/publisher/:id/books")
  .get(PublisherController.getAllBookPublisher);

module.exports = { router };
