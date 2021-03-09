'use strict';
const faker = require('faker')

let nama = ['indomie','mie sedap','indomilk','roma','c1000']


let product = [...Array(5)].map((e,i)=>{
  return {
    name: nama[i],
    price: 15000,
    weight: faker.random.number({min:1,max:10}),
    qtyTotal: 0,
    categoryId: faker.random.number({min:2,max:5}),
    createdAt: new Date(),
    updatedAt: new Date()
  }
})


module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert('products', product)
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
  }
};
