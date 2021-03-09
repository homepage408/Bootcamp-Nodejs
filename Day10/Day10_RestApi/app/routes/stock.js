const express = require("express");
const router = express.Router();
const StockController = require("./../controller/stockController");

router
  .route("/stocks")
  .post(StockController.createStock)
  .get(StockController.getListStock)
//   .get(StockController.getByQuery)

router
  .route("/stocks/:id")
  .get(StockController.getListById)
  .put(StockController.updateListStock);

// router.route('/stocks').get(StockController.getProduct)
// router.route('/stocks/:id').delete(StockController.deleteStocks)

module.exports = { router };
