'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      qty: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM,
          values: ['in','out']
      },
      detailDate: {
        type: Sequelize.DATE
      },
      expDate: {
        type: Sequelize.DATE
      },
      productId: {
        type: Sequelize.INTEGER,
        references:{
          model:'products',
          key:'id'
        },
        onDelete:'CASCADE'
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
    await queryInterface.dropTable('stocks');
  }
};