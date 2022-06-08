'use strict';
const {randProductName, randProductDescription, rand, randFlightNumber, randFloat } = require('@ngneat/falso');


module.exports = {
  async up (queryInterface, Sequelize) {

    let products = [];

    for(let i = 0; i < 100; i++){
      products.push({
        productName: randProductName(),
        description: randProductDescription(),
        category: rand([ 1, 2, 3 ]),
        productCode: randFlightNumber(),//simulates productCode
        price: randFloat({ min: 100, max: 10000, fraction: 2 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    await queryInterface.bulkInsert('Products', products, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
