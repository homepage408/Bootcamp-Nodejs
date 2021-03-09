const { date } = require("faker");
const { categori, product, stock } = require("./../db/models");
const response = require("./../response/res");
// const enumParam = require('express-enum-param')

// let enumValue = ['IN','OUT']

async function getProduct (id) {
  let dataStock = await product.findAll({
    attributes: ["id", "qtyTotal", "price"],
    where: { id: id },
  });
  return dataStock[0].qtyTotal;
//   console.log(dataStock[0])
}

getProduct(2).then((e)=>{
    let data = e + 3
    console.log(data)
})