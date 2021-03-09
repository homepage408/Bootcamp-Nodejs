'use strict';
const {
  Model
} = require('sequelize');
const stock = require('./stock');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // product.
      // product.belongsTo(models.categori)
      // product.hasMany(models.stock)
    }
  };
  product.init({
    name: DataTypes.STRING,
    price: DataTypes.REAL,
    weight: DataTypes.FLOAT,
    qtyTotal: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};