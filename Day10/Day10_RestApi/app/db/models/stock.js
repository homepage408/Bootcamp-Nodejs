'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // stock.belongsTo(models.product)
    }
  };
  stock.init({
    qty: DataTypes.INTEGER,
    type: DataTypes.ENUM('in','out'),
    detailDate: DataTypes.DATE,
    expDate: DataTypes.DATE,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'stock',
  });
  return stock;
};