const express = require("express");
const PublisherController = require("./../controller/publisherController");
const router = express.Router();
const validation = require('./../utils/middleware/validation')
const {createPublisher} = require('./../utils/helpers/valYum')


router
  .route("/publisher")
  .post(validation(createPublisher),PublisherController.createPublisher)
  .get(PublisherController.getAllPublisher);

router
  .route("/publisher/:id")
  .get(PublisherController.getByIdPublisher)
  .put(validation(createPublisher),PublisherController.updatePublisher)
  .delete(PublisherController.deletePublisher);

router
  .route("/publisher/:id/books")
  .get(PublisherController.getAllBookPublisher);


module.exports = { router };
