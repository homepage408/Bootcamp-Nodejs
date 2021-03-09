'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // categori.hasMany(models.product)
    }
  };
  categori.init({
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'categori',
  });
  return categori;
};