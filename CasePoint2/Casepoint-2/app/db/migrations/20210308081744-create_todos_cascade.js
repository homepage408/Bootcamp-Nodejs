'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('todos', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references:{
        model:"users",
        key:"id"
      },
      onDelete: 'CASCADE'
    });

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeConstraint("todos", "todos_userId_fkey")
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
