'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('menus', 'client_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('menus', 'client_id'),
    ]);
  }
};
