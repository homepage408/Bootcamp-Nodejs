'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      typeId: {
        type: Sequelize.INTEGER,
        references:{
          model:'types',
          key:'id'
        },
        onDelete: 'CASCADE'
      },
      hourlyPrice: {
        type: Sequelize.FLOAT
      },
      licensePlate: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM,
        values:['off','rent','broke']
      },
      photo: {
        type: Sequelize.STRING
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vehicles');
  }
};