'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.addColumn('Products', 'productCode', { type: Sequelize.STRING, allowNull: false, unique: true })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'productCode', { /* query options */ })
  }
};
