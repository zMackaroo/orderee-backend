'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Main Courses',
        description: 'Main Courses',
        active: true,
      },
      {
        name: 'Side Dishes',
        description: 'Side Dishes',
        active: true,
      },
      {
        name: 'Desserts',
        description: 'Desserts',
        active: true,
      },
      {
        name: 'Drinks',
        description: 'Drinks',
        active: true,
      },
      {
        name: 'Snacks',
        description: 'Snacks',
        active: true,
      },
      {
        name: 'Breakfast',
        description: 'Breakfast',
        active: true,
      },
      {
        name: 'Lunch',
        description: 'Lunch',
        active: true,
      },
      {
        name: 'Dinner',
        description: 'Dinner',
        active: true,
      },
      {
        name: 'Appetizers',
        description: 'Appetizers',
        active: true,
      },
      {
        name: 'Soups',
        description: 'Soups',
        active: true,
      },
      {
        name: 'Salads',
        description: 'Salads',
        active: true,
      },
      {
        name: 'Pasta',
        description: 'Pasta',
        active: true,
      },
      {
        name: 'Pizza',
        description: 'Pizza',
        active: true,
      },
      {
        name: 'Sandwiches',
        description: 'Sandwiches',
        active: true,
      },
      {
        name: 'Burgers',
        description: 'Burgers',
        active: true,
      },
      {
        name: 'Wraps',
        description: 'Wraps',
        active: true,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
