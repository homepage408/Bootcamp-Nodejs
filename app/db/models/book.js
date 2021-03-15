'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  book.init({
    authorId: DataTypes.INTEGER,
    publisherId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    year: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};