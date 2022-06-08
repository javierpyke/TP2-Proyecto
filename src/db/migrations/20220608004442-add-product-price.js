'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'price', { type: Sequelize.DECIMAL(10, 2) , allowNull: false, defaultValue: 1000 })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'price', { /* query options */ })
  }
};
