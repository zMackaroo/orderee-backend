'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('clients', [
      {
        name: 'Mcdo-libee',
        active: true
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('clients', {
      name: 'Mcdo-libee',
    });
  }
};
