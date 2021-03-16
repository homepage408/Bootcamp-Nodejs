'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      vehicle.belongsTo(models.type)
    }
  };
  vehicle.init({
    name: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
    hourlyPrice: DataTypes.FLOAT,
    licensePlate: DataTypes.STRING,
    status: DataTypes.ENUM("off","rent","broke"),
    photo: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'vehicle',
    paranoid:true
  });
  return vehicle;
};