const { date } = require("faker");
const { categori, product, stock } = require("./../db/models");
const response = require("./../response/res");
// const enumParam = require('express-enum-param')

// let enumValue = ['IN','OUT']

class StockController {
  static async updateStockProduct(id) {
    let dataStock = await product.findAll({
      attributes: ["id", "qtyTotal", "price"],
      where: { id: id },
    });
    return dataStock[0].qtyTotal;
  }

  static async createStock(req, res) {
    try {
      let dataInput = {
        qty: req.body.qty,
        type: req.body.type,
        detailDate: req.body.detailDate,
        expDate: req.body.expDate,
        productId: req.body.productId,
      };
      const productId = req.body.productId;

      if (dataInput.type === "in") {
        const dataCreate = await stock.create(dataInput);
        StockController.updateStockProduct(productId).then((e) => {
          let dataStock = dataInput.qty + e;
          product.update(
            { qtyTotal: dataStock },
            {
              where: {
                id: productId,
              },
            }
          );
        });
        // res.json(data);
        const stockUpdated = await StockController.updateStockProduct(productId)
        response.success('success', {dataCreate,stockUpdated}, 200, res)
      } else {
        const data = await StockController.updateStockProduct(productId);
        if (data < dataInput.qty) {
          return res.json({
            msg: "Data habis",
          });
        } else {
          const dataCreate = await stock.create(dataInput);
          let dataStock = data - dataInput.qty;
          product.update(
            { qtyTotal: dataStock },
            {
              where: {
                id: productId,
              },
            }
          );
          // res.json(dataCreate);
          const stockUpdated = await StockController.updateStockProduct(productId)
          // let dataCreate.Stock =
          response.success('success', {dataCreate, stockUpdated}, 200, res)
        }
      }
    } catch (error) {
      // res.json(error.message);
      response.notSuccess(error.message, error, 500, res)
    }
  }

  static async getListStock(req, res) {
    try {
      let queryParam = req.query
      if (Object.keys(queryParam).length !== 0) {
        console.log(queryParam)
        const dataStock = await stock.findAll({
          order:[['expDate',queryParam.list]]
        })
        return response.success('success',dataStock,200,res)
      } else {
        const dataStocks = await stock.findAll();
        return response.success("success", dataStocks, 200, res);
      }
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }

  static async getListById(req, res) {
    try {
      const dataStock = await stock.findByPk(req.params.id);
      if (dataStock) {
        return response.success("success", dataStock, 200, res);
      }
      return response.notSuccess("stock doesn't exist", [], 204, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }

  static async updateListStock(req, res) {
    try {
      const newData = {
        type: req.body.type,
        detailDate: req.body.detailDate,
        expDate: req.body.expDate,
        productId: req.body.productId,
      };
      const newUpdate = await stock.update(newData, {
        where: {
          id: req.params.id,
        },
      });
      if (newUpdate[0]) {
        const dataUpdate = await stock.findByPk(req.params.id);
        return response.success("success", dataUpdate, 200, res);
      }
      return response.notSuccess("stock doesn't exist", [], 204, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }

  //   static async deleteStocks(req, res) {
  //     try {
  //       const dataDel = await stock.destroy({
  //         where: {
  //           id: req.params.id,
  //         },
  //       });
  //       if (dataDel) {
  //         response.success("hapus", [], 200, res);
  //       }
  //     } catch (error) {
  //       response.notSuccess(error.message, error, 500, res);
  //     }
  //   }

  
}

module.exports = StockController;
