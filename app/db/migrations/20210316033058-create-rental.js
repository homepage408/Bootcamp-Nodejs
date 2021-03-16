'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rentals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onDelete: 'CASCADE'
      },
      vehicleId: {
        type: Sequelize.INTEGER,
        references:{
          model:'vehicles',
          key:'id'
        },
        onDelete: 'CASCADE'
      },
      totalPrice: {
        type: Sequelize.FLOAT
      },
      startAt: {
        type: Sequelize.DATE
      },
      backAt: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM("progress","done"),
        defaultValue: 'progress'
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
    await queryInterface.dropTable('rentals');
  }
};