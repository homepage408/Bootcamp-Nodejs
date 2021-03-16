'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rental.belongsTo(models.user)
      rental.belongsTo(models.vehicle)
    }
  };
  rental.init({
    userId: DataTypes.INTEGER,
    vehicleId: DataTypes.INTEGER,
    totalPrice: DataTypes.FLOAT,
    startAt: DataTypes.DATE,
    backAt: DataTypes.DATE,
    status: DataTypes.ENUM("progress","done"),
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'rental',
    paranoid:true
  });
  return rental;
};