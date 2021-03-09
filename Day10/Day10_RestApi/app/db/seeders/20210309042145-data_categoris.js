'use strict';

let categori = ['Minuman','Makanan Ringan','Makanan Berat','Minuman Bersoda']
let dataCategori = [...Array(categori.length)].map((e,i)=>{
  return {
    category: categori[i],
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert('categoris', dataCategori)
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
