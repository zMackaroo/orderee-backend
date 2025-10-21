'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('clients', 'email', {
        type: Sequelize.STRING,
        unique: true,
      }),
      queryInterface.addColumn('clients', 'contact_number', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('clients', 'address', {
        type: Sequelize.TEXT,
      }),
      queryInterface.addColumn('clients', 'branch', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('clients', 'username', {
        type: Sequelize.STRING,
        unique: true,
      }),
      queryInterface.addColumn('clients', 'password', {
        type: Sequelize.STRING,
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('clients', 'email'),
      queryInterface.removeColumn('clients', 'contact_number'),
      queryInterface.removeColumn('clients', 'address'),
      queryInterface.removeColumn('clients', 'branch'),
      queryInterface.removeColumn('clients', 'username'),
      queryInterface.removeColumn('clients', 'password'),
      queryInterface.removeColumn('clients', 'active'),
    ]);
  }
};
