'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('menus', [
      {
        name: 'Tocilog',
        description: 'Tocino with fried rice and egg',
        price: 100,
        client_id: 1,
        createdAt: new Date(),
      },
      {
        name: 'Adobong Pusit',
        description: 'Adobong Pusit with rice',
        price: 100,
        client_id: 1,
        createdAt: new Date(),
      },
      {
        name: 'Lugaw',
        description: 'Lugaw with chicken blood',
        price: 50,
        client_id: 1,
        createdAt: new Date(),
      },
      {
        name: 'Sinigang',
        description: 'Sinigang with tamarind and vegetables',
        price: 100,
        client_id: 1,
        createdAt: new Date(),
      },
      {
        name: 'Liempo',
        description: 'Liempo with rice and egg',
        price: 100,
        client_id: 1,
        createdAt: new Date(),
      },
      {
        name: 'Pork Sinigang',
        description: 'Pork Sinigang with tamarind and vegetables',
        price: 100,
        client_id: 1,
        createdAt: new Date(),
      },
      {
        name: 'Pork Liempo',
        description: 'Pork Liempo with rice and egg',
        price: 100,
        client_id: 1,
        createdAt: new Date(),
      },
      {
        name: 'Combo Meal for 4',
        description: 'Combo Meal for 4 with choices of your favorite menu',
        price: 600,
        client_id: 1,
        createdAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('menus', null, {});
  }
};
