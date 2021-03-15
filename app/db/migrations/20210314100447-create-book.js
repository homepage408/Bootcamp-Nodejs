'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      authorId: {
        type: Sequelize.INTEGER,
        references:{
          model:'authors',
          key:'id'
        },
        onDelete: 'CASCADE'
      },
      publisherId: {
        type: Sequelize.INTEGER,
        references:{
          model:'publishers',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      title: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      year: {
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
    await queryInterface.dropTable('books');
  }
};