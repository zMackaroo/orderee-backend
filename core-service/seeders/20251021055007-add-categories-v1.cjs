'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Rice Meals',
        description: 'Rice Meals',
        active: true,
      },
      {
        name: 'Silog Meals',
        description: 'Silog Meals',
        active: true,
      },
      {
        name: 'Combo Meals',
        description: 'Combo Meals',
        active: true,
      },
      {
        name: 'Set Meals',
        description: 'Set Meals',
        active: true,
      },
      {
        name: 'Platter Meals',
        description: 'Platter Meals',
        active: true,
      },
      {
        name: 'Student Meals',
        description: 'Student Meals',
        active: true,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
