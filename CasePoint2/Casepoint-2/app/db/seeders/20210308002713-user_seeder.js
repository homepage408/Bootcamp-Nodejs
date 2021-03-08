"use strict";
const faker = require("faker");
faker.locale = "id_ID";

// const crypto = require("crypto");
// const { fake } = require("faker");
// const hashSecret = "kuncirahasia";
// const plainText = "password";

// const passHased = crypto
//   .createHmac("sha256", hashSecret)
//   .update(plainText)
//   .digest("hex");

const users = [...Array(10)].map((user) => {
  return {
    username: faker.name.firstName().toLocaleLowerCase(),
    fullname: faker.name.findName(),
    email: faker.internet.exampleEmail(),
    password: faker.internet.password(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", users);
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
