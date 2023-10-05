'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //  Add seed commands here.

    // Example:
    await queryInterface.bulkInsert('roles', [{
      name: 'admin',
      createdAt:'2023-11-04 13:37:59', 
      updatedAt:'2023-11-04 13:37:59',
    }], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('roles', null, {});

  }
};


