"use strict";
const faker = require("faker");
faker.locale = "id_ID";

// console.log(faker.lorem.sentence())
// console.log(faker.lorem.sentences())

const todos = [...Array(3)].map((todo) => {
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(),
    userId: 10,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("todos", todos);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
