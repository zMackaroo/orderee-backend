'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('clients', 'createdAt', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }),
      queryInterface.addColumn('clients', 'updatedAt', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }),
      queryInterface.addColumn('clients', 'deletedAt', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('clients', 'createdAt'),
      queryInterface.removeColumn('clients', 'updatedAt'),
      queryInterface.removeColumn('clients', 'deletedAt'),
    ]);
  }
};
